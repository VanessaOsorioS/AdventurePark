import { injectable, /* inject, */ BindingScope, service } from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors, response } from '@loopback/rest';
import { __await } from 'tslib';
import { Keys } from '../config/Keys';
import { CredencialesLogin, CredencialesRecuperarClave } from '../models';
import { CodigosAutenticacionRepository, UsuarioRepository } from '../repositories';
import { JwtService } from './jwt.service';
var generator = require('generate-password');
var generateCode = require('password-generator');
var MD5 = require('crypto-js/md5')
const fetch = require('node-fetch')
const params = new URLSearchParams();

@injectable({ scope: BindingScope.TRANSIENT })
export class SeguridadUsuarioService {
  constructor(
    @repository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    @repository(CodigosAutenticacionRepository)
    private codigosAutenticacionRepository: CodigosAutenticacionRepository,
    @service(JwtService)
    private servicioJwt: JwtService
  ) { }

  /**
   * Metodo para la autenticación del usuario
   * @param credenciales credenciales de acceso
   * @returns una cadena con el token si todo está bien o una cadena vacia si hay algun error en la autenticación
   */
  async identificarUsuario(credenciales: CredencialesLogin): Promise<string> {
    let respuesta = "";
    let usuario = await this.usuarioRepository.findOne(
      {
        where: {
          correo: credenciales.nombreUsuario,
          clave: credenciales.clave
        }
      }
    )

    if (usuario) {
      let datos = {
        nombre: `${usuario.nombres} ${usuario.apellidos}`,
        correo: usuario.correo,
        rol: usuario.rolId
      }
      try {
        respuesta = this.servicioJwt.crearToken(datos);
        console.log(respuesta);
      } catch (error) {
        throw error;
      }
    }


    return respuesta
  }

  /**
   * método para generar una clave aleatoria de 10 caracteres
   * @returns clave generada
   */
  crearClaveAleatoria(): string {
    let password = generator.generate({
      lengh: 10,
      numbers: true,
      symbols: true,
      uppercase: true
    })
    return password
  }

  /**
   * método para generar un codigo aleatrorio de 6 digitos
   * @returns clave generada
   */
  CrearCodigoAleatorio(): number {
    let codigo = Number(generateCode(6, false, /\d/))
    console.log(typeof codigo)
    return codigo
  }

  /**
   * cifra una cadena de texto en MD5
   * @param cadena cadena a cifrar
   * @returns cadena cifrada en MD5
   */
  cifrarCadena(cadena: string): string {
    let cadenaCifrada = MD5(cadena).toString();
    return cadenaCifrada;
  }

  /**
   * se recupera una clave generndola aleatoriamente y enviandola
   * @param credenciales credenciales del usuario a recuperar su clave
   */
  async recuperarClave(credenciales: CredencialesRecuperarClave): Promise<boolean> {
    let usuario = await this.usuarioRepository.findOne({
      where: {
        correo: credenciales.correo
      }
    })
    if (usuario) {
      let nuevaClave = this.crearClaveAleatoria();
      let nuevaClaveCifrada = this.cifrarCadena(nuevaClave);
      usuario.clave = nuevaClaveCifrada;
      this.usuarioRepository.updateById(usuario._id, usuario)

      let mensaje = `Hola ${usuario.nombres} <br/> Su contraseña ha sido actualizada a ${nuevaClave} satisfactoriamente, si no ha sido usted quien actualizó la contraseña, por favor tome las medidas pertinentes <br/><br/> Saludos desde AdventurePark!!`

      params.append('hash_validator', 'Admin@email.sender');
      params.append('destination', usuario.correo);
      params.append('subject', Keys.mensajeAsuntoRecuperarClave);
      params.append('message', mensaje);

      let r = '';
      await fetch(Keys.urlEnviarCorreo, { method: 'POST', body: params }).then(async (res: any) => {
        r = await res.text();
        // console.log(r);
      })
      return r == "OK";
    } else {
      throw new HttpErrors[400]("El correo ingresado no está asociado a un usuario")
    }
  }

  /**
   * verifica el usuario y le envia el codigo
   * @param credenciales credenciales de login
   * @returns
   */
  async envioCodigo(credenciales: CredencialesLogin): Promise<boolean> {
    const params = new URLSearchParams()
    let respuesta = ""

    let usuario = await this.usuarioRepository.findOne({
      where: {
        correo: credenciales.nombreUsuario,
        clave: credenciales.clave
      }
    }
    );

    if (usuario) {
      // Generación del código
      let codigoAleatorio = this.CrearCodigoAleatorio();
      //Guardar codigo en la base de datos
      let codigo = {
        "id_usuario": usuario._id,
        "codigo": codigoAleatorio,
        "estado": true
      }

      let resPostCodigo = ''
      await fetch(Keys.urlPostCodigos, {
        method: 'POST',
        body: JSON.stringify(codigo),
        headers: { "Content-Type": "application/json" }
      }).then(async (res: any) => {
        resPostCodigo = await res.text()
        console.log("codigo de verificación: " + codigoAleatorio)
        console.log("resPostCodigo: " + resPostCodigo)
      });

      // envio del codigo
      // let mensaje = {
      //   "mensaje": `Hola ${usuario.nombres}, tu codigo de verificion es`,
      //   "codigo": `${codigoAleatorio}`
      // }
      let mensaje = `Hola ${usuario.nombres}, su codigo de verificion es: ${codigoAleatorio}`
      
      console.log(mensaje);

      let r = '';

      params.append('hash_validator', 'Admin@email.sender');
      params.append('destination', usuario.correo);
      params.append('subject', Keys.mensajeAsuntoEnvioCodigo);
      // params.append('message', JSON.stringify(mensaje));
      params.append('message', mensaje);
      console.log(params)

      await fetch(Keys.urlEnviarCorreo, { method: 'POST', body: params }).then(async (res: any) => {
        r = await res.text()
        console.log("r: " + r)
      });

      return r == "OK";
    } else {
      throw new HttpErrors[400]("El usuario o la contraseña ingresada no son validos");
    }
  }


  /**
   * valida el codigo de doble factor
   * @param codigo el codigo de verificación de usuario
   * @returns true o false
   */
  async ValidarCodigo(codigo: number): Promise<object> {
    let cod = await this.codigosAutenticacionRepository.findOne({
      where: {
        codigo: codigo,
      },
    });
    if (cod && cod.estado) {
      let usuario = await this.usuarioRepository.findOne({
        where: {
          _id: cod.id_usuario,
        },
      });

      if (usuario) {
        //creación del token y asignación a respuesta
        let datos = {
          id: usuario._id,
          nombre: `${usuario.nombres} ${usuario.apellidos}`,
          correo: usuario.correo,
          rol: usuario.rolId,
          // isLogged: false
        }
        try {
          cod.estado = false;
          this.codigosAutenticacionRepository.updateById(cod._id, cod)
          let respuesta = {
            Token: this.servicioJwt.crearToken(datos),
            User: datos
          }
          console.log(respuesta);
          return respuesta;
        } catch (err) {
          throw err;
        }
      } else {
        return { error: "Usuario no registrado" }
      }
    } else {
      return { error: "Codigo invalido" }
    }
  }

}
