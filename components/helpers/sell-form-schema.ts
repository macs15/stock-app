import { SellForm } from 'components/hooks/useSellForm'
import Joi from 'joi'

export const SellFormSchema = Joi.object<SellForm>({
  productQty: Joi.number().positive().integer().required().messages({
    'number.unsafe': 'O campo é obrigatório',
    'number.positive': 'O campo não pode ser negativo ou zero',
    'number.base': 'O campo é obrigatório',
    'any.required': 'O campo é obrigatório'
  }),
  pricePerProduct: Joi.number().positive().required().messages({
    'number.unsafe': 'O campo é obrigatório',
    'number.positive': 'O campo não pode ser negativo ou zero',
    'number.base': 'O campo é obrigatório',
    'any.required': 'O campo é obrigatório'
  })
})
