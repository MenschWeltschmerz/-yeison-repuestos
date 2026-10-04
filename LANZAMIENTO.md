# Lista de lanzamiento — YeisonRepuestos

## 1. Revisión previa (en tu computador)
- [ ] `node scripts/go-live.mjs` — debe terminar sin **BLOQUEADORES**.
- [ ] Completar en `politica-garantias.html` los datos amarillos: plazo de respuesta, tiempos de entrega, horario, correo, razón social y NIT.
- [ ] Abogado aprueba la política → quitar el aviso "Borrador pendiente de revisión legal" y el texto "[Borrador — …]" del pie de `index.html`.
- [ ] Reemplazar las fotos de banco (`fotos/*.jpg`) por las del cliente (mismo nombre de archivo) y quitar la leyenda "Imagen de referencia".
- [ ] Cambiar el pie "muestra de sitio web / Contenido de ejemplo" por el texto final.
- [ ] Confirmar teléfonos, correo y qué categorías atiende cada WhatsApp.

## 2. Activar la indexación
- [ ] `node scripts/go-live.mjs --apply` (cambia `noindex` por `index, follow` en 13 páginas; la 404 queda igual).
- [ ] Verificar: `node scripts/go-live.mjs` ya no debe listar páginas por cambiar.

## 3. Subir a Hostinger
- [ ] Subir todo **menos**: `.git/`, `scripts/`, `LANZAMIENTO.md`, `.gitignore`, `.nojekyll`, `.claude/`.
- [ ] Incluir `.htaccess` (redirige a `https://www`, comprime, cachea y agrega cabeceras de seguridad).
- [ ] Activar el certificado SSL en el panel de Hostinger **antes** de probar.

## 4. Probar el sitio publicado
- [ ] `http://yeisonrepuestos.com` y `http://www…` terminan en `https://www.yeisonrepuestos.com/`.
- [ ] Una URL inexistente muestra la página 404.
- [ ] El video se reproduce y el botón de pausa funciona; los botones de WhatsApp abren con el mensaje correcto.
- [ ] Compartir el enlace en WhatsApp muestra la imagen (`og-image.jpg`).

## 5. Después del lanzamiento
- [ ] Google Search Console: verificar el dominio y enviar `https://www.yeisonrepuestos.com/sitemap.xml`.
- [ ] Analytics: pegar el ID de medición (los clics a WhatsApp ya envían el evento `whatsapp_click`). Con analítica, definir el aviso de cookies.
- [ ] Opcional, cuando el HTTPS esté estable: agregar la cabecera HSTS en `.htaccess`.
- [ ] Si cambias fotos o CSS/JS, la caché del navegador es de 1 semana: renombra el archivo o espera.
