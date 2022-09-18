import { z, AnyZodObject } from "zod"
import { Request, Response, NextFunction } from "express"

const errInvalidId = "ID inválido"

const getDiscord = z.object({
  params: z.object({
    id: z.string().uuid(errInvalidId)
  })
})

const getGameAdsSchema = z.object({
  params: z.object({
    id: z.string().uuid(errInvalidId)
  })
})

const postGameAdsSchema = z.object({
  params: z.object({
    id: z.string().uuid(errInvalidId)
  }),
  body: z.object({
    name: z.string().min(1, "Nome não pode ser vazio").trim(),
    yearsPlaying: z.number().nonnegative("Anos jogando deve ser maior ou igual a 0"),
    discord: z.string().regex(/.*[^# ]#[0-9]{4}/gm, "o Discord deve ser discord#tag").trim(),
    weekDays: z.array(z.number()).min(1).max(7),
    hourStart: z.string().regex(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]/gm, "Formato: HH:MM").trim(),
    hourEnd: z.string().regex(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]/gm, "Formato: HH:MM").trim(),
    useVoiceChannel: z.boolean()
  })
})

const validate = (schema: AnyZodObject) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: request.body,
        query: request.query,
        params: request.params
      })
      return next()
    } catch (err) {
      return response.status(400).json(err)
    } 
  }

export const GetDiscord = () => validate(getDiscord)
export const GetGameAds = () => validate(getGameAdsSchema)
export const PostGameAds = () => validate(postGameAdsSchema)