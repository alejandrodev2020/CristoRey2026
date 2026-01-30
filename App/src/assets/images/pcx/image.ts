
interface ProductItem {
  code: string;
  quantity: number;
  name: string;
  unitPrice: number;
  discount:number;
  total: number;
}
interface ProductDetail {
  product: {
    id?: number|null;
    code: string;
    name: string;
    description ?: string | null;
    descriptionSmall ?: string | null;
  };
  unitMeasurenment: {
    name: string;
  };
  amount: number;
  price: number;
  discount: number;
  subTotal: number;
}
interface NotaVentaData {
  numeroNota: number;
  cliente: string;
  Vendedor: string;
  fecha: string; // formato: DD/MM/YYYY
  productos: ProductDetail[];
  total: number;
  metodoPago: string;
}
function generarLineasDeProductos(details: ProductDetail[], yInicial: number): { cpcl: string; yFinal: number } {
  let productsText = "";
  const itemSpacing = 60; // Espacio vertical entre cada par de líneas (un item completo)
  const line2Offset = 25; // Pequeño espacio entre la línea 1 y la línea 2 del MISMO item
  let currentY = yInicial;

  for (const item of details) {
    // --- Línea 1: Código y Descripción ---
    const code = item.product.code.padEnd(8);
    // Acortamos la descripción si es muy larga para que no se desborde
    const description = item.product.name.substring(0, 35); 
    const line1 = `${code}${description}`;
    productsText += `TEXT 7 0 10 ${currentY} ${line1}\n`;

    // --- Línea 2: Detalles numéricos ---
    const unit = (item.unitMeasurenment.name || 'N/A').padEnd(8);
    const quantity = item.amount.toFixed(2).replace('.', ',').padStart(7);
    const unitPrice = item.price.toFixed(2).replace('.', ',').padStart(8);
    const discount = item.discount.toFixed(2).replace('.', ',').padStart(6);
    // El precio final por unidad es el mismo que el precio si el descuento es 0
    const finalPrice = item.price.toFixed(2).replace('.', ',').padStart(8);
    const subtotal = item.subTotal.toFixed(2).replace('.', ',').padStart(8);

    const line2 = `${unit}${quantity}${unitPrice}${discount}${finalPrice}${subtotal}`;
    productsText += `TEXT 7 0 10 ${currentY + line2Offset} ${line2}\n`;
    
    // Mover la coordenada 'y' para el siguiente item
    currentY += itemSpacing;
  }

  return { cpcl: productsText, yFinal: currentY };
}

export function generarNotaVentaCPCL(data: NotaVentaData): string {
  const spacing = 35;
  let y = 320;

  // Armar líneas de productos (incluyendo code y descuento)
//   const productLines = data.productos.map((item) => {
//     const { code, quantity, name, unitPrice, discount, total } = item;
//     return `${code.padEnd(4)} ${quantity.toString().padEnd(4)} ${name.padEnd(12)} ${unitPrice.toFixed(2).padEnd(6)} ${discount.toFixed(0).padEnd(4)} ${total.toFixed(2)}`;
//   });

//   let productsText = "";
//   for (let i = 0; i < productLines.length; i++) {
//     productsText += `TEXT 7 2 10 ${y + i * spacing} ${productLines[i]}\n`;
//   }
  const yProductos = 280; 
//   const spacingHeight = y + productLines.length * spacing + 40;
  const { cpcl: productsText, yFinal: spacingHeight } = generarLineasDeProductos(data.productos, yProductos);
  return `
! 0 10 10 ${spacingHeight + 300} 1
PW 576

TEXT 7 3 160 10 NOTA DE VENTA #${data.numeroNota}  

TEXT 7 2 10 80 Cliente:
TEXT 7 4 120 80 ${data.cliente}

TEXT 7 2 10 120 Fecha:
TEXT 7 2 120 120 ${data.fecha}

TEXT 7 2 400 120 Vendedor:
TEXT 7 4 470 120 ${data.Vendedor}

TEXT 7 2 10 160 ------------------------------------------

TEXT 7 2 10 200 COD  CNT  PRODUCTO     P.U   DESC IMP
TEXT 7 2 10 230 ------------------------------------------

${productsText}

TEXT 7 2 10 ${spacingHeight} ------------------------------------------

TEXT 7 2 10 ${spacingHeight + 30} TOTAL:
TEXT 7 2 400 ${spacingHeight + 30} S/. ${data.total.toFixed(2)}

TEXT 7 2 10 ${spacingHeight + 60} MÉTODO DE PAGO: ${data.metodoPago}

TEXT 7 2 10 ${spacingHeight + 90} ------------------------------------------

TEXT 7 2 150 ${spacingHeight + 130} ¡Gracias por su compra!

TEXT 7 2 150 ${spacingHeight + 170} Firma del Cliente:
LINE 150 ${spacingHeight + 200} 550 ${spacingHeight + 200}

SET-TOF
FORM
PRINT
`;
}


const notaData: NotaVentaData = {
  numeroNota: 24,
  cliente: "Tomas Perez",
  Vendedor: "Julian Arama",
  fecha: "25/09/2025",
  metodoPago: "EFECTIVO",
  total: 32.5,
  productos:  [
    {
      amount: 12.00,
      price: 0.5,
      subTotal: 6,
      discount: 0,
      product: {
        code: "60610",
        name: "TUERCA HEX MET. CAB/FLANGE 6-1.00",
      },
      unitMeasurenment: {
        name: "Unidad",
      }
    },
    {
      amount: 12.00,
      price: 1.0,
      subTotal: 12,
      discount: 0,
      product: {
        code: "60612",
        name: "PERNO HEX MET CAB/FLANGE 6-1.00X12",
      },
      unitMeasurenment: {
        name: "Unidad",
      }
    },
    // ...puedes agregar más productos aquí siguiendo el mismo formato
  ],
};

export const imageTest = generarNotaVentaCPCL(notaData);
