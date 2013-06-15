var RPC = (function() {
	function RPC(type, dataType, url, data, successCallback, errorCallback) {
		this.Type = type;
		this.DataType = dataType;
		thgis.URL = url;
		this.FormData = data;
		this.SuccessCallback = successCallback;
		this.ErrorCallback = errorCallback;
	}
	RPC.prototype._executeCall = function() {
		var rpc = this;
		$.ajax({
			type: this.Type,
			dataType: this.DataType,
			url: base + this.URL,
			data: this.FormData,
			success: function(msg) {
				if (rpc.successCallback) {
					rpc.successCallback();
				}
			},
			error: function(msg) {
				if (rpc.ErrorCallback) {
					rpc.ErrorCallback();
				}
				//global error logging
			}
		});
	};
	return RPC;
})();
