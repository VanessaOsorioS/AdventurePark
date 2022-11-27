import {AuthenticationStrategy} from '@loopback/authentication';
import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import fetch from 'node-fetch';
import parseBearerToken from 'parse-bearer-token';
import {GeneralConfig} from '../config/general-config';

@injectable({scope: BindingScope.TRANSIENT})
export class AdminAuthorizationStrategy implements AuthenticationStrategy {
  name = "admin";

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    console.log(`Token de la request: ${token}`);
    if (token) {
      const esValido = await fetch(`${GeneralConfig.url_ms_seguridad}/${GeneralConfig.metodo_validar_jwt}/${token}`)
      console.log("Es válido: " + esValido)
      console.log(esValido)
      let rolId = await esValido.text();
      if (rolId == GeneralConfig.adminRolId) {
        // validar el id
        let perfil: UserProfile = Object.assign({
          admin: 'OK',
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("Solicitud rechazada porque el token enviado no es válido.");
      }
    } else {
      throw new HttpErrors[401]("Solicitud rechazada porque no tiene un token.");
    }
  }
}
