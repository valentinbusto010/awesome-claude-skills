# Tecno Riv — Videos con Remotion

Reels y videos de producto para @Tecno_riv, hechos con código ([Remotion](https://www.remotion.dev)).

## Arrancar

```bash
cd tecnoriv-video
npm install
npm run dev        # abre Remotion Studio para previsualizar y editar textos/colores
```

## Reel de producto (`ProductoReel`)

Vertical 1080x1920, 15 s, para Instagram/TikTok. 4 escenas: gancho → producto → 3 beneficios → precio + CTA a WhatsApp.

1. Poné la foto del producto (PNG sin fondo, idealmente) en `public/productos/`.
2. Editá los textos en Studio (panel derecho) o en `src/Root.tsx` (`defaultProps`).
3. Renderizá:

```bash
npx remotion render ProductoReel out/reel.mp4
```

Para sacar varios productos sin tocar código:

```bash
npx remotion render ProductoReel out/airpods.mp4 --props='{"producto":"AirPods Pro 2","imagen":"productos/airpods.png","precio":"$ 00.000"}'
```

Las props que no pases toman el valor por defecto.

## Licencia

Remotion es gratis para equipos de hasta 3 personas. Más grande → licencia paga (remotion.pro/license).
