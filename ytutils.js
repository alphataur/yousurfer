const ytdl = require("ytdl-core")
const fs = require("fs").promises

if(Array.prototype.last === undefined){
  Array.prototype.last = function(){
    return this[this.length - 1]
  }
}

if(Object.prototype.keys === undefined){
  Object.prototype.keys = function(){
    return Object.keys(this)
  }
}

class YoutubeErrors{
  static URI_UNDEF = "URL not defined"
}

class Youtube{
  constructor(uri){
    this.uri = uri
    if(this.uri === undefined)
      throw new Error(errors.URI_UNDEF)
  }
  async fetch(){
    this.info = await ytdl.getInfo(this.uri)
  }
  getFormats(){
    return this.info.formats.map(e => {
      return {
        itag: e.itag,
        url: e.url,
        width: e.width,
        height: e.height,
        length: e.contentLength,
        duration: e.approxDurationMs,
        hasAudio: e.hasAudio,
        hasVideo: e.hasVideo
      }
    })
  }
  getVideoMeta(){
    return this.info.videoDetails.map(e => {
      return {
        title: e.title,
        description: e.description,
        lengthSecs: e.lengthSecs,
        viewCount: e.viewCount,
        updloadDate: e.updloadDate,
        author: e.author,
        likes: e.likes,
        dislikes: e.dislikes,
      }
    })
  }
  getRecommendation(){
    return this.info.related_videos
  }
}


module.exports = {
  Youtube
}

async function main(){
  let handler = new Youtube("https://www.youtube.com/watch?v=kDGYEqrHv00")
  await handler.fetch()
  console.log(handler.getFormats())
}


