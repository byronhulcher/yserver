# Youtubr API

An API for http://github.com/byronhulcher/youtubr implemented in Node.js

## Relevant Technologies
* Node.js - http://nodejs.org/
* Express - http://expressjs.com/
* Mongoose - http://mongoosejs.com/
* MongoDB - http://www.mongodb.org/

## Documentation
API endpoints
```
GET /video
	returns: all video objects

POST /video
	requires: {youtubeUrl: string}
	optional: {startSeconds: int, endSeconds: int}
	action: Creates a new video object using the supplied parameters
	returns: new video object or 400

GET /video/<video_id>
	returns: video object matching video ID or 404
```
