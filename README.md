<center> 
  <br/>
  <img src="public/favicon.svg"/> 
  <h1>Xoukan</h1>
  <br/>
</center>

# Xoucan

[README inglish version](README.en.md)

Xoucan es una aplicación web estática diseñada para compartir archivos de cualquier tamaño, utilizando WebRTC para transferencias directas entre pares. Con Xoucan, no hay límites en la cantidad de transferencias y no se requiere un servidor centralizado, lo que garantiza la privacidad y la eficiencia.

## Características

- **Compartir Archivos Ilimitados**: Comparte archivos sin preocuparte por el tamaño o la cantidad de transferencias.
- **Tecnología WebRTC**: Transferencias de archivos peer-to-peer directas y seguras.
- **Sin Servidor**: No se requiere un servidor centralizado; las configuraciones se envían a través de un enlace.
- **Compatibilidad con Múltiples Plataformas**: Envía el enlace de configuración a través de WhatsApp o cualquier otra aplicación de mensajería.

## Tecnologías Utilizadas

- ReactJS con TypeScript (ReactTS)
- Estilos con SASS
- Empaquetado y construcción con Vite
- Pruebas unitarias con Jest
- Pnpm como administrador de paquetes

## Cómo Usar

1. **Generar Enlace de Configuración**: Entra a a haku.xoukan.com y presiona copiar enlace de conexión
2. **Enviar Enlace**: Comparte el enlace generado a través de tu aplicación de mensajería preferida.
3. **Conexión**:  Una vez el receptor abra el enlace se creará la conexión
4. **Transferencia de archivos** Una vez se cree la conexión ambas partes pueden enviarse archivos mutuamente.

## Contribuir

Las contribuciones son bienvenidas. Si tienes una idea para mejorar la aplicación o quieres reportar un problema, por favor, abre un nuevo issue o envía un pull request.

## Licencia

Xoucan está bajo la Licencia GPL. Sientete libre de usar, compartir y modificar el código.

---

Xoucan - Compartiendo archivos, sin límites.

```LICENCE```
```LICENCE 
    Xoukan Compartir archivos sin servidor usando webRTC
    Copyright (C) 2024 Jhon Jairo Guerrero Sanchez 
    <garruxx@gmail.com>

    Este programa es software libre: puedes redistribuirlo y/o modificarlo
    bajo los términos de la Licencia Pública General GNU publicada por la
    la Free Software Foundation, ya sea la versión 3 de la Licencia, o
    (a su elección) cualquier versión posterior.

    Este programa se distribuye con la esperanza de que sea útil,
    pero SIN NINGUNA GARANTÍA; ni siquiera la garantía implícita de
    COMERCIABILIDAD o IDONEIDAD PARA UN PROPÓSITO PARTICULAR.  Consulte la
    Licencia Pública General GNU para más detalles.

    Debería haber recibido una copia de la Licencia Pública General GNU
    junto con este programa.  Si no es así, consulte <https://www.gnu.org/licenses/>.
```