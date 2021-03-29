export interface Post {
  id: string
  title: string
  name: string
  subreddit_name_prefixed: string
  thumbnail: string
  url: string
  score: number
  permalink: string
}

export interface RedditResponse {
  data: {
    children: RedditResponseChildren[]
  }
}

export interface RedditResponseChildren {
  data: {
    thumbnail: string
  }
}
