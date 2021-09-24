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
    'string.empty': 'O campo é obrigatório',
    'any.required': 'O campo é obrigatório'
  }),
  provider_cost: Joi.number().required().messages({
    'string.empty': 'O campo é obrigatório',
    'any.required': 'O campo é obrigatório'
  })
})
