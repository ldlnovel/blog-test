module.exports = {
	response(res,httpCode = 500,message='服务端异常',success, data={}) {
		let responseData = {};
		// responseData.code = code;
		responseData.msg = message;
		responseData.data = data;
		responseData.success = success;
		res.status(httpCode).send(responseData)
	}
}