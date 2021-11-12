/**
 * PromocionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addPromocion: async(req,res) =>{
    try{
      const { descripcion, porcentaje, fecha_inicio, fecha_fin } = req.allParams();
      const promos = await Promocion.find({
        fecha_inicio:{
          '<=' : fecha_inicio
        },
        fecha_inicio:{
          '<': fecha_fin
        },
        fecha_fin:{
          '>=' : fecha_fin
        },
        fecha_fin:{
          '>': fecha_inicio
        }
      })

      console.log(promos)

      if(promos.length === 0){
        const promo = await Promocion.create({
          descripcion, porcentaje, fecha_inicio, fecha_fin
        }).fetch()
        console.log(promo)
        return res.ok(promo).json()
      }

      return res.badRequest('Ya existe promocion para estas fechas')
    }catch(err){
      return res.serverError(err).json
    }
  }

};

