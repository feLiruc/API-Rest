import * as restify from 'restify'

const mpContentType = 'application/merge-patch+json'

export const mergePatchBodyParser = (req: restify.Request, res: restify.Response, next) => {
	if(req.getContentType() == mpContentType && req.method == 'PATCH'){

		(<any>req).rawBody = req.body

		try{
			req.body = JSON.parse(req.body)
		}catch(e){
			return next(new Error(`Invalid content: ${e.message}`))
		}

	}
	return next()
}