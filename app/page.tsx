"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Dumbbell, Flame, ShieldCheck, ShoppingBag, Sparkles, TableProperties, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type Line = "Pre-entreno" | "BCAA" | "Proteína" | "Creatina";
type Product = { id: string; line: Line; flavor: string; name: string; weight: string; image: string; accent: string; benefit: string; servings: string; details: string; };
type NutritionProfile = { serving: string; servings: string; energy: string; rows: Array<[string, string]>; ingredients: string; note?: string; };

const products: Product[] = [
  { id: "pre-mango", line: "Pre-entreno", flavor: "Mango", name: "Pre-entreno Mango", weight: "300 g", image: "/products/pre-entreno-mango.png", accent: "#f3a61f", benefit: "Energía, intensidad y enfoque para sesiones exigentes.", servings: "30 porciones aprox.", details: "Presentación de 300 g. Fórmula objetivo por servicio: beta alanina, malato de citrulina, taurina y 300 mg de cafeína. Sin lisina." },
  { id: "pre-uva", line: "Pre-entreno", flavor: "Uva", name: "Pre-entreno Uva", weight: "300 g", image: "/products/pre-entreno-uva.png", accent: "#a855f7", benefit: "Activación y concentración con un perfil de sabor intenso.", servings: "30 porciones aprox.", details: "Presentación de 300 g. Fórmula objetivo por servicio: beta alanina, malato de citrulina, taurina y 300 mg de cafeína. Sin lisina." },
  { id: "pre-limon", line: "Pre-entreno", flavor: "Limón", name: "Pre-entreno Limón", weight: "300 g", image: "/products/pre-entreno-limon.png", accent: "#9dde20", benefit: "Potencia y enfoque con un sabor cítrico de alto impacto.", servings: "30 porciones aprox.", details: "Presentación de 300 g. Fórmula objetivo por servicio: beta alanina, malato de citrulina, taurina y 300 mg de cafeína. Sin lisina." },
  { id: "bcaa-mango", line: "BCAA", flavor: "Mango", name: "BCAA Mango", weight: "300 g", image: "/products/bcaa-mango.png", accent: "#f3a61f", benefit: "Aminoácidos de cadena ramificada para entrenamiento y recuperación.", servings: "30 porciones", details: "Presentación de 300 g. Servicio de referencia de 10 g, conforme a la tabla nutrimental del fabricante." },
  { id: "bcaa-uva", line: "BCAA", flavor: "Uva", name: "BCAA Uva", weight: "300 g", image: "/products/bcaa-uva.png", accent: "#a855f7", benefit: "Soporte de recuperación con un perfil de sabor profundo.", servings: "30 porciones", details: "Presentación de 300 g. Servicio de referencia de 10 g, conforme a la tabla nutrimental del fabricante." },
  { id: "bcaa-limon", line: "BCAA", flavor: "Limón", name: "BCAA Limón", weight: "300 g", image: "/products/bcaa-limon.png", accent: "#9dde20", benefit: "Recuperación y frescura para antes, durante o después de entrenar.", servings: "30 porciones", details: "Presentación de 300 g. Servicio de referencia de 10 g, conforme a la tabla nutrimental del fabricante." },
  { id: "proteina-vainilla", line: "Proteína", flavor: "Vainilla", name: "Proteína Vainilla", weight: "1.5 kg", image: "/products/protein-vainilla.png", accent: "#f5d36f", benefit: "26 g de proteína por porción con un sabor suave de vainilla.", servings: "50 porciones", details: "Presentación de 1.5 kg. Fórmula de proteína diseñada para complementar tus objetivos diarios de nutrición y recuperación." },
  { id: "proteina-chocolate", line: "Proteína", flavor: "Chocolate", name: "Proteína Chocolate", weight: "1.5 kg", image: "/products/protein-chocolate-v2.png?v=20260919-2", accent: "#c67a39", benefit: "26 g de proteína por porción con un perfil intenso de chocolate.", servings: "50 porciones", details: "Presentación de 1.5 kg. Fórmula de proteína diseñada para complementar tus objetivos diarios de nutrición y recuperación." },
  { id: "iso-sin-sabor", line: "Proteína", flavor: "Sin sabor", name: "ISO Whey Protein", weight: "1 kg", image: "/products/protein-sin-sabor-v2.png?v=20260919-2", accent: "#d4a94f", benefit: "Proteína aislada sin sabor, cero azúcar y cero carbohidratos.", servings: "Según ficha técnica", details: "Presentación de 1 kg. Perfil limpio y versátil para mezclar con tus bebidas o recetas favoritas." },
  { id: "creatina", line: "Creatina", flavor: "Sin sabor", name: "Creatina Monohidratada", weight: "300 g", image: "/products/creatina-sin-sabor-v2.png?v=20260919-2", accent: "#e6bd5d", benefit: "Creatina monohidratada sin sabor y sin aditivos.", servings: "60 porciones", details: "Presentación de 300 g. Servicio de referencia de 5 g para integrarse fácilmente a tu rutina de entrenamiento." },
];

const filters = ["Todos", "Pre-entreno", "BCAA", "Proteína", "Creatina"] as const;

function nutritionFor(product: Product): NutritionProfile {
  if (product.line === "Pre-entreno") return {
    serving: "10 g", servings: "30", energy: "No declarada en la ficha pública",
    rows: [["Beta alanina", "1,500 mg"], ["Malato de citrulina", "1,500 mg"], ["Taurina", "660 mg"], ["Cafeína anhidra", "300 mg"]],
    ingredients: "Saborizante, ácido cítrico y stevia.",
  };
  if (product.line === "BCAA") return {
    serving: "10 g", servings: "30", energy: "No declarada en la ficha pública",
    rows: [["L-leucina", "4.5 g"], ["L-isoleucina", "2.25 g"], ["L-valina", "2.25 g"]],
    ingredients: "Saborizante, ácido cítrico y stevia.",
  };
  if (product.line === "Creatina") return {
    serving: "5 g", servings: "60", energy: "0 kcal*",
    rows: [["Creatina monohidratada", "5 g"]],
    ingredients: "Creatina monohidratada.",
  };
  return {
    serving: "30 g", servings: product.weight === "1.5 kg" ? "50" : "33.3", energy: "122 kcal / 510 kJ",
    rows: [["Proteínas", "24 g"], ["Grasas totales", "0.9 g"], ["Grasa saturada", "0.4 g"], ["Grasa monoinsaturada", "0.2 g"], ["Grasas trans", "0 g"], ["Carbohidratos", "3 g"], ["Azúcares", "0 g"], ["Fibra dietaria", "6 g"], ["Sodio", "55.4 mg"], ["Potasio", "179 mg"], ["Calcio", "155.7 mg"], ["Fósforo", "96.3 mg"], ["Magnesio", "16.3 mg"]],
    ingredients: "Proteína de leche, suero de leche, excipiente c.b.p., saborizantes naturales y artificiales y stevia.",
  };
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const [showNutrition, setShowNutrition] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartProducts = products.filter((product) => cart[product.id] > 0);
  function addToCart(product: Product) {
    setCart((current) => ({ ...current, [product.id]: Math.min(99, (current[product.id] || 0) + 1) }));
    setSelected(null);
    setCartOpen(true);
  }
  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const next = { ...current, [id]: Math.min(99, Math.max(0, (current[id] || 0) + delta)) };
      if (!next[id]) delete next[id];
      return next;
    });
  }
  const visible = useMemo(() => products.filter((product) => filter === "Todos" || product.line === filter), [filter]);
  const whatsappLink = (product: Product | string) => {
    const label = typeof product === "string" ? product : `${product.name}, ${product.weight}`;
    return `https://wa.me/?text=${encodeURIComponent(`Hola, quiero información y cotización de KRNIVORO ${label}.`)}`;
  };

  return (
    <main className="min-h-screen bg-[#060708] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060708]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="KRNIVORO Supplements, inicio">
            <span className="grid size-11 place-items-center rounded-xl border border-[#d4a94f]/50 bg-[#d4a94f]/10 font-black text-[#e5bd64]">KV</span>
            <span><strong className="block text-lg tracking-[0.14em]">KRNIVORO</strong><span className="block text-[11px] tracking-[0.32em] text-[#d4a94f]">SUPPLEMENTS</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-zinc-300 md:flex" aria-label="Navegación principal"><a className="hover:text-white" href="#catalogo">Productos</a><a className="hover:text-white" href="#calidad">Fórmula</a><a className="hover:text-white" href="#distribuidores">Distribuidores</a></nav>
          <Button onClick={() => setCartOpen(true)} className="bg-[#d4a94f] text-black hover:bg-[#efcc7a]" aria-label={`Abrir carrito, ${cartCount} productos`}><ShoppingBag /> Carrito ({cartCount})</Button>
        </div>
      </header>

      <section id="inicio" className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="hero-grid overflow-hidden rounded-[2rem] border border-[#d4a94f]/20">
          <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
            <Badge className="mb-6 border border-[#d4a94f]/30 bg-[#d4a94f]/10 text-[#efcc7a]">México · KRNIVORO Supplements</Badge>
            <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Fuerza sin límites. <span className="text-[#d4a94f]">Rendimiento real.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">Pre-entreno, BCAA, proteínas y creatina KRNIVORO. Una línea completa para activar, entrenar, recuperar y construir.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-[#d4a94f] text-black hover:bg-[#efcc7a]"><a href="#catalogo">Explorar productos <ArrowRight /></a></Button><Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"><a href="#distribuidores">Venta a distribuidores</a></Button></div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-[#d4a94f]">Clean supplements</p>
          </div>
          <div className="hero-warriors relative min-h-[360px] border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0"><img src="/krnivoro-gladiators.png" alt="Guerreros KRNIVORO con proteína y creatina" className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-[#060708] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#060708]/75 lg:via-transparent" /></div>
        </div>
        <div id="calidad" className="mt-5 grid gap-3 sm:grid-cols-3">{[[Zap, "Energía y enfoque", "Pre-entrenos de alto impacto"], [ShieldCheck, "Clean Supplements", "Fórmulas claras y directas"], [Dumbbell, "Rendimiento integral", "Proteína, aminoácidos y creatina"]].map(([Icon, title, copy]) => <div key={String(title)} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#d4a94f]/10 text-[#e5bd64]"><Icon className="size-5" /></span><div><h2 className="font-semibold">{String(title)}</h2><p className="text-sm text-zinc-400">{String(copy)}</p></div></div>)}</div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="rounded-xl border border-[#d4a94f]/25 bg-[#d4a94f]/5 px-5 py-3 text-sm text-[#efcc7a]">Próxima apertura de nuestra tienda en México. Explora los productos y arma tu carrito. Los precios y el pago en línea estarán disponibles próximamente.</p></div>
      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="mb-2 text-sm font-bold uppercase tracking-[0.22em] text-[#d4a94f]">Catálogo KRNIVORO</p><h2 className="text-3xl font-bold sm:text-5xl">Elige tu siguiente objetivo</h2><p className="mt-3 max-w-2xl text-zinc-400">Diez productos para energía, recuperación, fuerza y nutrición deportiva.</p></div><div className="flex flex-wrap gap-2">{filters.map((item) => <Button key={item} size="sm" variant={filter === item ? "default" : "outline"} onClick={() => setFilter(item)} className={filter === item ? "bg-[#d4a94f] text-black hover:bg-[#efcc7a]" : "border-white/15 bg-transparent text-zinc-300 hover:bg-white/10 hover:text-white"}>{item}</Button>)}</div></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map((product) => <article key={product.id} className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0d1013] transition duration-300 hover:-translate-y-1 hover:border-[#d4a94f]/50">
            <button className="relative block h-[390px] sm:h-[420px] w-full overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(212,169,79,.16),transparent_60%)] p-8 text-left" onClick={() => { setShowNutrition(false); setSelected(product); }} aria-label={`Ver ${product.name}`}>
              <img src={product.image} alt={`KRNIVORO ${product.name}, ${product.weight}`} className="h-full w-full object-contain drop-shadow-[0_28px_28px_rgba(0,0,0,.55)] transition duration-500 group-hover:scale-[1.035]" loading="lazy" />
              <Badge className="absolute left-4 top-4 border border-white/10 bg-black/75 text-white">{product.weight}</Badge>
            </button>
            <div className="border-t border-white/10 p-6"><div className="mb-3 flex items-center justify-between gap-3"><Badge variant="outline" className="border-white/15 text-zinc-300">{product.line}</Badge><span className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: product.accent }}>{product.flavor}</span></div><h3 className="text-2xl font-black uppercase">{product.name}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">{product.benefit}</p><div className="mt-4 grid gap-2"><Button className="bg-[#d4a94f] text-black hover:bg-[#efcc7a]" onClick={() => addToCart(product)}><ShoppingBag /> Agregar al carrito</Button><Button variant="outline" className="border-[#d4a94f]/35 bg-[#d4a94f]/5 text-[#efcc7a] hover:bg-[#d4a94f]/15 hover:text-white" onClick={() => { setShowNutrition(true); setSelected(product); }}><TableProperties /> Tabla nutrimental</Button><Button variant="ghost" className="w-full justify-between px-0 text-[#e5bd64] hover:bg-transparent hover:text-[#f4d995]" onClick={() => { setShowNutrition(false); setSelected(product); }}>Conocer producto <ArrowRight /></Button></div></div>
          </article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"><div className="brand-manifesto grid overflow-hidden rounded-[2rem] border border-[#d4a94f]/20 lg:grid-cols-[.8fr_1.2fr]"><div className="min-h-80 bg-[url('/krnivoro-gladiators.png')] bg-cover bg-center" /><div className="flex flex-col justify-center p-8 sm:p-12"><Sparkles className="mb-5 size-8 text-[#d4a94f]" /><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d4a94f]">Disciplina · Fuerza · Legado</p><h2 className="mt-3 text-3xl font-black uppercase sm:text-5xl">Forja tu mejor versión.</h2><p className="mt-5 max-w-xl leading-7 text-zinc-300">Una identidad inspirada en quienes entrenan con propósito. KRNIVORO une suplementación deportiva, carácter y presencia para acompañarte en cada etapa.</p></div></div></section>

      <section id="distribuidores" className="border-y border-white/10 bg-[#0d1013]"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8"><div><Badge className="mb-5 bg-[#d4a94f]/10 text-[#e5bd64]">Canal comercial</Badge><h2 className="max-w-2xl text-3xl font-bold sm:text-5xl">Línea lista para gimnasios, coaches y distribuidores.</h2><p className="mt-5 max-w-2xl leading-7 text-zinc-400">Solicita disponibilidad, mínimos de compra, condiciones comerciales y paquetes para el portafolio completo.</p></div><div className="rounded-2xl border border-[#d4a94f]/25 bg-[#d4a94f]/[0.06] p-6"><h3 className="text-xl font-semibold">Cotización comercial</h3><ul className="mt-5 space-y-3 text-sm text-zinc-300">{["3 sabores de Pre-entreno", "3 sabores de BCAA", "3 opciones de proteína", "Creatina monohidratada"].map((item) => <li key={item} className="flex items-center gap-3"><Flame className="size-4 text-[#d4a94f]" />{item}</li>)}</ul><Button asChild size="lg" className="mt-7 w-full bg-[#d4a94f] text-black hover:bg-[#efcc7a]"><a href={whatsappLink("programa de distribuidores para el portafolio completo")} target="_blank" rel="noreferrer">Hablar con un asesor <ArrowRight /></a></Button></div></div></section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-9 text-sm text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><p>© 2026 KRNIVORO Supplements. Fórmula, etiquetado y claims sujetos a liberación técnica final.</p><p className="uppercase tracking-[0.13em]">KRNIVORO Supplements · Empowered by MTCAPITAL.FUND</p></footer>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full border-white/10 bg-[#0d1013] text-white sm:max-w-xl">
          {selected && (() => {
            const nutrition = nutritionFor(selected);
            return <>
              <SheetHeader className="border-b border-white/10 p-6 pr-12">
                <Badge className="mb-3 w-fit bg-[#d4a94f]/10 text-[#e5bd64]">{selected.line} · {selected.weight}</Badge>
                <SheetTitle className="text-3xl font-black uppercase text-white">{showNutrition ? "Tabla nutrimental" : selected.name}</SheetTitle>
                <SheetDescription className="text-base leading-7 text-zinc-400">{showNutrition ? `${selected.name} · Información por porción` : selected.benefit}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 overflow-y-auto px-6 py-5">
                {showNutrition ? <>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                    <div className="grid grid-cols-3 border-b border-white/10 bg-[#d4a94f]/10 p-4 text-sm">
                      <div><p className="text-xs uppercase tracking-wider text-zinc-500">Porción</p><p className="mt-1 font-bold">{nutrition.serving}</p></div>
                      <div><p className="text-xs uppercase tracking-wider text-zinc-500">Porciones</p><p className="mt-1 font-bold">{nutrition.servings}</p></div>
                      <div><p className="text-xs uppercase tracking-wider text-zinc-500">Energía</p><p className="mt-1 font-bold">{nutrition.energy}</p></div>
                    </div>
                    <table className="w-full text-sm"><thead><tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-zinc-500"><th className="px-4 py-3 font-medium">Componente</th><th className="px-4 py-3 text-right font-medium">Por porción</th></tr></thead><tbody>{nutrition.rows.map(([name, value]) => <tr key={name} className="border-b border-white/[0.07] last:border-0"><td className="px-4 py-3 text-zinc-300">{name}</td><td className="px-4 py-3 text-right font-semibold text-white">{value}</td></tr>)}</tbody></table>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><p className="text-xs uppercase tracking-wider text-zinc-500">Ingredientes de referencia</p><p className="mt-2 text-sm leading-6 text-zinc-300">{nutrition.ingredients}</p></div>
                  {nutrition.note && <p className="rounded-xl border border-[#d4a94f]/20 bg-[#d4a94f]/5 p-4 text-sm leading-6 text-[#f2d99e]">{nutrition.note}</p>}
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4 text-sm leading-6 text-amber-100/80">Referencia obtenida de la ficha pública de Nutrazeal y adaptada al contenido neto KRNIVORO. Debe validarse contra la formulación, análisis y etiqueta final liberada por el laboratorio antes de comercialización.</div>
                  <a className="inline-flex text-sm font-medium text-[#e5bd64] hover:text-[#f4d995]" href="https://www.premiumnutritionalsupplements.com.mx/shop" target="_blank" rel="noreferrer">Consultar fuente del fabricante <ArrowRight className="ml-2 size-4" /></a>
                </> : <>
                  <div className="min-h-80 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(212,169,79,.16),transparent_65%)]"><img src={selected.image} alt={`KRNIVORO ${selected.name}`} className="h-96 w-full object-contain p-6" /></div>
                  <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><p className="text-xs uppercase tracking-wider text-zinc-500">Presentación</p><p className="mt-1 font-medium">{selected.weight}</p></div><div className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><p className="text-xs uppercase tracking-wider text-zinc-500">Rendimiento</p><p className="mt-1 font-medium">{selected.servings}</p></div></div>
                  <p className="leading-7 text-zinc-300">{selected.details}</p>
                  <Button variant="outline" className="w-full border-[#d4a94f]/35 bg-[#d4a94f]/5 text-[#efcc7a] hover:bg-[#d4a94f]/15 hover:text-white" onClick={() => setShowNutrition(true)}><TableProperties /> Ver tabla nutrimental</Button>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4 text-sm leading-6 text-amber-100/80">Concepto comercial sujeto a ficha técnica, etiquetado y liberación regulatoria final. Este producto no sustituye una alimentación equilibrada.</div>
                </>}
              </div>
              <SheetFooter className="border-t border-white/10 p-6"><Button size="lg" className="w-full bg-[#d4a94f] text-black hover:bg-[#efcc7a]" onClick={() => addToCart(selected)}><ShoppingBag /> Agregar al carrito</Button></SheetFooter>
            </>;
          })()}
        </SheetContent>
      </Sheet>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full border-white/10 bg-[#0d1013] text-white sm:max-w-xl">
          <SheetHeader className="border-b border-white/10 p-6 pr-12">
            <SheetTitle className="text-3xl font-black text-white">Tu carrito</SheetTitle>
            <SheetDescription className="text-zinc-400">{cartCount} {cartCount === 1 ? "producto seleccionado" : "productos seleccionados"}</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6">
            {cartProducts.length === 0 ? <div className="py-12 text-center"><ShoppingBag className="mx-auto mb-5 size-12 text-[#d4a94f]" /><h3 className="text-xl font-semibold">Tu carrito está vacío</h3><p className="mt-3 text-zinc-400">Explora la línea KRNIVORO y agrega tus productos favoritos.</p><Button className="mt-6 bg-[#d4a94f] text-black" onClick={() => setCartOpen(false)}>Ver productos</Button></div> : <ul className="space-y-5">{cartProducts.map(product => <li key={product.id} className="flex gap-4 rounded-2xl border border-white/10 p-3">
              <img src={product.image} alt={product.name} className="h-32 w-24 shrink-0 object-contain p-2" />
              <div className="min-w-0 flex-1"><h3 className="font-bold">{product.name}</h3><p className="mt-1 text-sm text-zinc-400">{product.weight} · {product.flavor}</p><div className="mt-3 flex items-center gap-3"><Button variant="outline" size="icon" aria-label={"Restar uno de " + product.name} onClick={() => changeQuantity(product.id, -1)}>−</Button><span aria-live="polite">{cart[product.id]}</span><Button variant="outline" size="icon" disabled={cart[product.id] >= 99} aria-label={"Agregar uno de " + product.name} onClick={() => changeQuantity(product.id, 1)}>+</Button></div><button className="mt-2 min-h-11 text-sm text-zinc-400 underline hover:text-white" onClick={() => setCart(current => { const next = { ...current }; delete next[product.id]; return next; })} aria-label={"Quitar " + product.name}>Quitar</button></div>
            </li>)}</ul>}
          </div>
          {cartProducts.length > 0 && <SheetFooter className="border-t border-white/10 p-6"><p className="mb-3 text-sm leading-6 text-zinc-300">La venta en línea abrirá próximamente. Aún no se realizan pedidos ni cargos.</p><Button disabled size="lg" className="w-full bg-[#d4a94f] text-black">Pago próximamente</Button><Button variant="ghost" onClick={() => setCartOpen(false)}>Seguir explorando</Button></SheetFooter>}
        </SheetContent>
      </Sheet>
    </main>
  );
}
