export interface Post {
  id: string
  title: string
  name: string
  subreddit_name_prefixed: string
  thumbnail: string
  url: string
  score: number
  permalink: string
  is_video: boolean
  media: {
    reddit_video: {
      fallback_url: string
    }
    type: string
  }
}

export interface RedditResponse {
  data: {
    children: RedditResponseChildren[]
  }
}

export interface RedditResponseChildren {
  data: {
    thumbnail: string
    url: string
  }
}
