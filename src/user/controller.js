
import { getTimeDifference } from 'lib/date'
import UserModel from './model'
import validatePhoneNumber from 'lib/utils/validatePhoneNumber'

const userTemp = {}

export default {
  signup_stepOne: async (req,res,next) => {

    try {

      
      if (!req.body.phone || !req.body.name) throw new Error('bad request: bad inputs')
      const validPhone = validatePhoneNumber(req.body.phone)

      const thisData = {
        name: req.body.name,
        phone: validPhone
      }

      thisData.code = '1111'
      thisData.date = new Date().toISOString()
      
      userTemp[thisData.phone] = thisData

      setTimeout(() => delete userTemp[thisData.phone], 200 * 1000)

      return res.json({ msg: 'ok' })
      
    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },
  signup_stepTwo: async (req,res,next) => {
    try {
      
      if (!req.body.phone || !req.body.code) throw new Error('bad request')
      const validPhone = validatePhoneNumber(req.body.phone)

      const thisUser = deepClone(userTemp[validPhone])

      if (thisUser.code !== req.body.code) throw new Error('wrong code')

      if (getTimeDifference(thisUser.date, new Date().toISOString()) > 200000) throw new Error('time\'s up')

      delete userTemp[validPhone] 

      await UserModel.create({
        name: thisUser.name,
        phone: thisUser.phone
      })

      res.status(200).json({
        msg: 'ok'
      })

    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },
  login_stepOne: async () => {

  },
  login_stepTwo: async () => {

  },

}