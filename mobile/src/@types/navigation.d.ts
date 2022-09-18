export interface GameParams {
  id: string
  title: string
  bannerUrl: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamsList {
      home: undefined
      game: GameParams
    }
  }
}