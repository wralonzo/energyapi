import ICounter from "../interfaces/counter.interface";

export const tableFormat = (counter: ICounter, client: string) => {
  return {
    content: [
      { text: "Factura del mes", style: "header" },
      { text: "Cliente: " + client },

      { text: "", style: "header" },
      { text: "Detalle de factura", style: "header" },
      {
        style: "tableExample",
        table: {
          body: [
            ["Lectura anterior", "Lectura actual", "Consumo", "Precio"],
            [counter.before, counter.previus, counter.monto, counter.price],
          ],
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex % 2 === 0 ? "#CCCCCC" : null;
          },
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };
};

export const fonts = {
  Roboto: {
    normal: __dirname + "/Roboto/Roboto-Black.ttf",
    bold: __dirname + "/Roboto/Roboto-Black.ttf",
    italics: __dirname + "/Roboto/Roboto-Black.ttf",
    bolditalics: __dirname + "/Roboto/Roboto-Black.ttf",
  },
};
