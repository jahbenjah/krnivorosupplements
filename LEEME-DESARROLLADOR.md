# KRNIVORO Supplements — entrega al desarrollador

Entrega: 29 de septiembre de 2026. Mercado inicial: México. Moneda futura: MXN. Sin Shopify.

## Abrir la versión HTML
Descomprimir TODO el ZIP. Abrir html/index.html en un navegador moderno. No necesita instalación, servidor ni conexión: CSS, JavaScript y fotografías son locales. No abrir el HTML dentro del ZIP. También puede alojarse el contenido de html/ en un servidor estático HTTPS. Es una adaptación estática del catálogo, no un export idéntico píxel por píxel del framework.

## Contenido
- html/: catálogo adaptable a móvil, diez productos, filtros, detalles, tablas de referencia y carrito con controles de cantidad.
- html/assets/: botes completos, imágenes de gladiadores, favicon y otros recursos originales.
- html/productos.js: datos usados en el navegador, editables sin compilar.
- html/productos.json: copia de intercambio para importar al backend; mantener sincronizada con productos.js.
- codigo-original/: aplicación React/Next/Vinext y componentes originales con lockfile. Fuente del catálogo y carrito publicados; no incluye node_modules, Git, archivos de entorno ni credenciales.

## Funcionamiento y límites
El carrito es temporal, sólo vive mientras la página está abierta; no crea pedidos ni cobra. No existe inventario real, backend de pedidos, cuenta de cobro ni panel administrativo. Los precios son null, nunca cero. El botón de pago está desactivado. El contacto comercial no se ha proporcionado; la adaptación HTML evita el enlace genérico de WhatsApp del original, que carecía de destinatario.

## Información nutrimental PENDIENTE
Las tablas entregadas son las referencias antiguas del catálogo, NO el resultado de una revisión terminada. Deben validarse antes de comercializar. La petición de actualizar desde Nutrazeal quedó incompleta.
- El propietario confirmó expresamente que los 34 g de proteína corresponden a ISO WHEY SIN SABOR. El HTML ya refleja esta corrección y separa ISO de la tabla Whey genérica. Falta confirmar el tamaño de porción y ficha exacta. No usar la tabla genérica de Whey para ISO. La imagen ISO actual dice 35G: requiere corrección tras validar.
- El propietario indica stevia y saborizante natural. Verificar por fórmula y presentación, especialmente los productos sin sabor. Los archivos anteriores incluyen saborizantes naturales y artificiales; no son fórmula final.
- BCAA: la descripción pública consultada decía 5 g / 60 porciones; el catálogo anterior usa 10 g / 30 porciones. Resolver con ficha técnica final, sin recalcular o inventar.
- Whey: imágenes/descripciones dicen 26 g; tabla genérica antigua dice 24 g. Revisar energía, fibra, minerales e ingredientes en cada presentación.
- Creatina: revisar 5 g por servicio, 60 servicios y energía (el registro antiguo contiene 0 kcal* sin sustento completo).
- Pre-entreno: corroborar cada ingrediente y dosis; mantener separados datos de referencia y fórmula final.
- Las imágenes de bote son representaciones comerciales proporcionadas en el proyecto. Sus leyendas, registros y supuestas certificaciones NO se verificaron; no constituyen prueba de autorizaciones.

## Fuentes a consultar
https://www.premiumnutritionalsupplements.com.mx/shop
https://www.premiumnutritionalsupplements.com.mx/shop/iso-whey-protein-51
https://www.premiumnutritionalsupplements.com.mx/shop/proteina-whey-8
https://www.premiumnutritionalsupplements.com.mx/shop/creatina-monohidratada-10
https://www.premiumnutritionalsupplements.com.mx/shop/bcaas-20
https://www.premiumnutritionalsupplements.com.mx/shop/euforia-pre-entreno-9

## Para habilitar la tienda
1. Validar fichas técnicas, ingredientes, alérgenos y etiquetas finales; sincronizar textos e imágenes.
2. Precios al final, según instrucción del propietario. Añadir inventario/SKU y precios MXN en servidor.
3. Integrar proveedor de pagos que acepte este giro. Credenciales sólo en servidor; no en HTML ni JavaScript público. Validar importes y disponibilidad en servidor.
4. Implementar órdenes persistentes, webhooks con firma e idempotencia, estados de pago y confirmaciones. No confirmar compras sólo por una página de retorno.
5. Definir envíos, cobertura, tarifas, datos del vendedor y contacto; privacidad, devoluciones y términos reales del negocio.
6. Probar pago aprobado, rechazado, pendiente, duplicado y reembolso en entorno de prueba.
7. Registrar/conectar krnivorosupplements.com si está disponible. No se ha comprado ni comprobado; configurar DNS y HTTPS.

## Aplicación original
Node >=22.13 y pnpm 11.25.0, según package.json. Conservar lockfile. En entorno compatible: pnpm install --frozen-lockfile; pnpm dev; pnpm build. Revisar scripts del proyecto y su perfil de ejecución antes de instalar: algunos flujos originales usan Bash/Linux. La instalación local de dependencias no se completó por tiempos de espera; la última versión sí se publicó mediante compilación remota de Sites. No se incluyen binarios de compilación.

Sitio existente: https://krnivoro-supplements.javiermanzov79.chatgpt.site
El manifest .openai/hosting.json identifica ese mismo proyecto de Sites. No crear otro ni cambiar acceso sin autorización. Esta entrega ZIP no modifica ni publica el sitio.

## Corrección confirmada en esta entrega
34 g corresponde exclusivamente a ISO Whey sin sabor. No cambiar las proteínas vainilla o chocolate a 34 g. El HTML muestra este dato aportado por el propietario, sin atribuirlo a una ficha del fabricante verificada. Falta el tamaño del servicio; no afirmar 34 g dentro de una porción de 30 g. La imagen del bote aún contiene 35G y debe corregirse antes de publicar la versión comercial. El código original se conserva como referencia de la versión publicada; aplicar allí la corrección del HTML al continuar el desarrollo.
