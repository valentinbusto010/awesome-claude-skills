import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import {
  DURACION_REEL,
  ProductoReel,
  productoReelSchema,
} from "./ProductoReel";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="TecnoRiv">
        <Composition
          // Reel vertical 9:16 para Instagram/TikTok:
          // npx remotion render ProductoReel out/reel.mp4
          id="ProductoReel"
          component={ProductoReel}
          schema={productoReelSchema}
          durationInFrames={DURACION_REEL}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            gancho: "¿Smartwatch tipo Ultra a menos de $23 mil?",
            producto: "Smartwatch Ultra Series 9",
            imagen: "productos/ultra-series-9.jpg",
            logo: "marca/logo-tecno.png",
            beneficios: [
              "Envío gratis",
              "30 días de garantía",
              "Cargador magnético incluido",
            ],
            precio: "$ 22.999",
            detallePago: "",
            cta: "Pedilo por WhatsApp",
            whatsapp: "Tecno Riv · Río Cuarto",
            instagram: "@Tecno_riv",
            // Colores sacados del logo de la página de Tecno Riv
            colorAcento: "#2D9CFF",
            colorFondo: "#0A1626",
          }}
        />
      </Folder>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />

    </>
  );
};
