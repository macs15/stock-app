import Joi from 'joi'

import { Products } from '../interfaces/product-service.interface'

export const ProductFormSchema = Joi.object<Products>({
  name: Joi.string().required().messages({
    'string.empty': 'O campo é obrigatório',
    'any.required': 'O campo é obrigatório'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'O campo é obrigatório',
    'any.required': 'O campo é obrigatório'
  }),
  category: Joi.string().required().messages({
    'string.empty': 'O campo é obrigatório',
    'any.required': 'O campo é obrigatório'
  }),
  in_stock: Joi.number().positive().required().messages({
    'number.unsafe': 'O campo é obrigatório',
    'number.positive': 'O campo não pode ser negativo ou zero',
    'number.base': 'O campo é obrigatório',
    'any.required': 'O campo é obrigatório'
  }),
  provider_cost: Joi.number().positive().required().messages({
    'number.unsafe': 'O campo é obrigatório',
    'number.positive': 'O campo não pode ser negativo ou zero',
    'number.base': 'O campo é obrigatório',
    'any.required': 'O campo é obrigatório'
  })
})
