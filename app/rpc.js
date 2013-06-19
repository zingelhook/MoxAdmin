var RPC = (function() {
	function RPC(type, dataType, url, data, successCallback, errorCallback) {
		this.Type = type;
		this.DataType = dataType;
		this.URL = url;
		this.FormData = data;
		this.SuccessCallback = successCallback;
		this.ErrorCallback = errorCallback;
		this._executeCall()
	}
	RPC.prototype._executeCall = function() {
		var rpcObj = this;
		$.ajax({
			type: rpcObj.Type,
			dataType: rpcObj.DataType,
			url: base + rpcObj.URL,
			data: rpcObj.FormData,
			success: function(msg) {
				if (rpcObj.SuccessCallback) {
					rpcObj.SuccessCallback(msg);
				}
			},
			error: function(msg) {
				console.log(msg);
				if (rpcObj.ErrorCallback) {
					rpcObj.ErrorCallback(msg);
				}
				//global error logging
			}
		});
	};
	return RPC;
})();