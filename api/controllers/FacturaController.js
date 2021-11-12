/**
 * FacturaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  addFactura:async(req, res) =>{
    try{
      const {fecha_crear, pago_total, promocion, medicamentos } = req.allParams()

      const factura = await Factura.create({fecha_crear, pago_total, promocion, medicamentos: JSON.parse(medicamentos)}).fetch()
      if(!factura){
        return res.badRequest('Error al crear factura').json()
      }
      return res.ok(factura).json()
    }catch(err){
      return res.serverError(err).json()
    }
  },
  getFacturas:async(req,res) =>{
    try{
      const { fecha_inicio, fecha_final } = req.allParams()
      const facturas = await Factura.find({
        fecha_crear: {
          '<=': fecha_inicio
        },
        fecha_crear:{
          '>=': fecha_final
        }
      })

      if(!facturas){
        return res.badRequest('No se realizaron ventas en estas fechas')
      }

      return res.ok(facturas).json()
    }catch(err){
      return res.serverError(err).json()
    }
  }
};

