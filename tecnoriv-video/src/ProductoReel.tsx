import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Todo lo editable del reel vive acá: se cambia desde Remotion Studio
// (panel derecho) o pasando --props al renderizar.
export const productoReelSchema = z.object({
  gancho: z.string(),
  producto: z.string(),
  // Ruta dentro de /public (ej: "productos/smartwatch.jpg"). Vacío = ilustración genérica.
  imagen: z.string(),
  // Logo de la marca dentro de /public. Vacío = sin logo.
  logo: z.string(),
  beneficios: z.array(z.string()).max(3),
  precio: z.string(),
  detallePago: z.string(),
  cta: z.string(),
  whatsapp: z.string(),
  instagram: z.string(),
  colorAcento: zColor(),
  colorFondo: zColor(),
});

export type ProductoReelProps = z.infer<typeof productoReelSchema>;

const FONT = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

// Duraciones de cada escena en frames (30 fps)
export const ESCENAS = {
  gancho: 75,
  producto: 120,
  beneficios: 120,
  cierre: 135,
};
export const DURACION_REEL =
  ESCENAS.gancho + ESCENAS.producto + ESCENAS.beneficios + ESCENAS.cierre;

const useEntrada = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 14 } });
};

const Gancho: React.FC<{ texto: string; acento: string }> = ({
  texto,
  acento,
}) => {
  const entrada = useEntrada();
  const frame = useCurrentFrame();
  const pulso = 1 + Math.sin(frame / 6) * 0.015;
  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", padding: 90 }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 118,
          lineHeight: 1.05,
          color: "white",
          textAlign: "center",
          transform: `scale(${entrada * pulso}) translateY(${(1 - entrada) * 80}px)`,
          opacity: entrada,
        }}
      >
        {texto}
      </div>
      <div
        style={{
          marginTop: 50,
          height: 14,
          width: 360 * entrada,
          borderRadius: 7,
          background: acento,
        }}
      />
    </AbsoluteFill>
  );
};

// Smartwatch dibujado con CSS, se usa cuando no hay foto del producto.
const IlustracionReloj: React.FC<{ acento: string }> = ({ acento }) => {
  const frame = useCurrentFrame();
  const segundos = (frame * 6) % 360;
  return (
    <div style={{ position: "relative", width: 420, height: 640 }}>
      <div
        style={{
          position: "absolute",
          left: 110,
          width: 200,
          height: 640,
          borderRadius: 60,
          background: "#1f1f24",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 120,
          width: 420,
          height: 400,
          borderRadius: 110,
          background: "#2b2b31",
          border: "10px solid #3d3d45",
          boxShadow: `0 0 120px ${acento}55`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 300,
            height: 280,
            borderRadius: 70,
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 6,
              height: 110,
              background: acento,
              borderRadius: 3,
              bottom: 140,
              transformOrigin: "bottom center",
              transform: `rotate(${segundos}deg)`,
            }}
          />
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              background: "white",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Producto: React.FC<{
  producto: string;
  imagen: string;
  acento: string;
}> = ({ producto, imagen, acento }) => {
  const entrada = useEntrada();
  const textoEntrada = useEntrada(20);
  const frame = useCurrentFrame();
  const flotar = Math.sin(frame / 15) * 14;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: imagen ? 60 : 90,
        paddingTop: 80,
      }}
    >
      <div
        style={{
          transform: `scale(${entrada}) translateY(${flotar}px) rotate(${(1 - entrada) * -25}deg)`,
        }}
      >
        {imagen ? (
          <div
            style={{
              width: 780,
              height: 1040,
              borderRadius: 56,
              overflow: "hidden",
              border: `6px solid ${acento}`,
              boxShadow: `0 0 90px ${acento}88`,
            }}
          >
            <Img
              src={staticFile(imagen)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${1.05 + frame / 900})`,
              }}
            />
          </div>
        ) : (
          <IlustracionReloj acento={acento} />
        )}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: imagen ? 80 : 92,
          color: "white",
          textAlign: "center",
          padding: "0 80px",
          opacity: textoEntrada,
          transform: `translateY(${(1 - textoEntrada) * 60}px)`,
        }}
      >
        {producto}
      </div>
    </AbsoluteFill>
  );
};

const Beneficio: React.FC<{ texto: string; delay: number; acento: string }> = ({
  texto,
  delay,
  acento,
}) => {
  const entrada = useEntrada(delay);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 36,
        opacity: entrada,
        transform: `translateX(${(1 - entrada) * -300}px)`,
      }}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          background: acento,
          color: "#000",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 56,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        ✓
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 70,
          color: "white",
          lineHeight: 1.1,
        }}
      >
        {texto}
      </div>
    </div>
  );
};

const Beneficios: React.FC<{ beneficios: string[]; acento: string }> = ({
  beneficios,
  acento,
}) => (
  <AbsoluteFill
    style={{ justifyContent: "center", padding: "0 90px", gap: 80 }}
  >
    {beneficios.map((b, i) => (
      <Beneficio key={b} texto={b} delay={i * 22} acento={acento} />
    ))}
  </AbsoluteFill>
);

const Cierre: React.FC<{
  precio: string;
  detallePago: string;
  cta: string;
  whatsapp: string;
  instagram: string;
  logo: string;
  acento: string;
}> = ({ precio, detallePago, cta, whatsapp, instagram, logo, acento }) => {
  const precioEntrada = useEntrada();
  const ctaEntrada = useEntrada(30);
  const frame = useCurrentFrame();
  const latido = 1 + Math.max(0, Math.sin((frame - 30) / 5)) * 0.04;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 70,
        fontFamily: FONT,
        textAlign: "center",
      }}
    >
      {logo ? (
        <div style={{ opacity: ctaEntrada }}>
          <Logo src={logo} ancho={720} acento={acento} />
        </div>
      ) : null}
      <div
        style={{
          transform: `scale(${precioEntrada})`,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ fontSize: 170, fontWeight: 900, color: acento }}>
          {precio}
        </div>
        {detallePago ? (
          <div style={{ fontSize: 52, fontWeight: 600, color: "#d6d6dc" }}>
            {detallePago}
          </div>
        ) : null}
      </div>
      <div
        style={{
          opacity: ctaEntrada,
          transform: `translateY(${(1 - ctaEntrada) * 80}px) scale(${latido})`,
          background: "#25D366",
          color: "white",
          fontSize: 64,
          fontWeight: 800,
          padding: "40px 70px",
          borderRadius: 999,
        }}
      >
        {cta}
      </div>
      <div
        style={{
          opacity: ctaEntrada,
          fontSize: 50,
          fontWeight: 600,
          color: "white",
          lineHeight: 1.5,
        }}
      >
        {whatsapp}
        <br />
        <span style={{ color: acento }}>{instagram}</span>
      </div>
    </AbsoluteFill>
  );
};

const Logo: React.FC<{ src: string; ancho: number; acento: string }> = ({
  src,
  ancho,
  acento,
}) => (
  <Img
    src={staticFile(src)}
    style={{
      width: ancho,
      borderRadius: ancho / 40,
      boxShadow: `0 0 ${ancho / 8}px ${acento}aa`,
    }}
  />
);

// Barra de progreso arriba, estilo historia de Instagram
const Progreso: React.FC<{ acento: string }> = ({ acento }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 60,
        right: 60,
        height: 8,
        borderRadius: 4,
        background: "#ffffff33",
      }}
    >
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: acento,
          width: `${(frame / durationInFrames) * 100}%`,
        }}
      />
    </div>
  );
};

export const ProductoReel: React.FC<ProductoReelProps> = (props) => {
  const frame = useCurrentFrame();
  const giro = interpolate(frame, [0, DURACION_REEL], [0, 90]);
  let desde = 0;
  const siguiente = (duracion: number) => {
    const inicio = desde;
    desde += duracion;
    return inicio;
  };
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 35%, ${props.colorAcento}33 0%, ${props.colorFondo} 60%)`,
        backgroundColor: props.colorFondo,
      }}
    >
      <AbsoluteFill
        style={{
          background: `conic-gradient(from ${giro}deg at 50% 50%, transparent, ${props.colorAcento}14, transparent 40%)`,
        }}
      />
      <Sequence from={siguiente(ESCENAS.gancho)} durationInFrames={ESCENAS.gancho}>
        <Gancho texto={props.gancho} acento={props.colorAcento} />
      </Sequence>
      <Sequence
        from={siguiente(ESCENAS.producto)}
        durationInFrames={ESCENAS.producto}
      >
        <Producto
          producto={props.producto}
          imagen={props.imagen}
          acento={props.colorAcento}
        />
      </Sequence>
      <Sequence
        from={siguiente(ESCENAS.beneficios)}
        durationInFrames={ESCENAS.beneficios}
      >
        <Beneficios beneficios={props.beneficios} acento={props.colorAcento} />
      </Sequence>
      <Sequence from={siguiente(ESCENAS.cierre)} durationInFrames={ESCENAS.cierre}>
        <Cierre
          precio={props.precio}
          detallePago={props.detallePago}
          cta={props.cta}
          whatsapp={props.whatsapp}
          instagram={props.instagram}
          logo={props.logo}
          acento={props.colorAcento}
        />
      </Sequence>
      {props.logo ? (
        <Sequence durationInFrames={DURACION_REEL - ESCENAS.cierre}>
          <AbsoluteFill style={{ alignItems: "center", top: 110 }}>
            <Logo src={props.logo} ancho={360} acento={props.colorAcento} />
          </AbsoluteFill>
        </Sequence>
      ) : null}
      <Progreso acento={props.colorAcento} />
    </AbsoluteFill>
  );
};
