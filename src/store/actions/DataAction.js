import { getRequest, postRequest, putRequest, deleteRequest } from '.'


class DataAction {

    constructor(baseUrl) {
        this._baseUrl = baseUrl;
        this._limit = 10;
        this._totalPage = 1;
        this._page = 1;
        this._userId = '';
        this._status = '';
        this._type = '';
        this._keyword = '';
    }


    // GET DOCUMENTS BY PAGINATION
    async getData({ userId, status, type, keyword, page }) {
        this._userId = userId || ''
        this._status = status || ''
        this._type = type || ''
        this._keyword = keyword || ''
        this._page = page || this._page

        return await this._getData()
    }


    // CALL API TO GET DOCUMENTS BY PAGINATION
    async _getData() {
        let { isSuccess, data } = await getRequest(this._makeUrl())
        if (!isSuccess) return ''
        return this._paginationFormat(data)
    }


    // PAGINATION FORMAT
    _paginationFormat(data) {
        this._totalPage = data.totalPage || this._totalPage

        return {
            data: data.data,
            totalPage: this._totalPage,
            page: this._page,
            limit: this._limit,
            others: data.others
        }
    }


    // GET DOCUMENT DETAIL
    async detail(id) {
        let { isSuccess, data } = await getRequest(`${this._baseUrl}/${id}`)
        if (!isSuccess) return ''
        return data
    }


    // MAKE URL
    _makeUrl() {
        let url = `${this._baseUrl}?limit=${this._limit}&page=${this._page}&status=${this._status}&userId=${this._userId}&type=${this._type}&keyword=${this._keyword}`

        return url;
    }


    // STORE NEW DOCUMENT
    async store(formData, customUrl = '') {
        let { data, isSuccess } = await postRequest(customUrl ? customUrl : this._baseUrl, formData)
        if (!isSuccess) return false

        return this._paginationFormat(data)
    }


    // UPDATE DOCUMENT
    async update(formData, id, customUrl = '') {
        let { isSuccess, data } = await putRequest(`${customUrl ? customUrl : this._baseUrl}/${id}`, formData)

        if (!isSuccess) return false

        return this._paginationFormat(data)
    }



    // DELETE DOCUMENT
    async remove(id) {
        let { isSuccess, data } = await deleteRequest(`${this._baseUrl}/${id}`)
        if (!isSuccess) return false

        return this._paginationFormat(data)
    }


    // GET ALL DOCUMENTS WITHOUT PAGINATION
    async getAll() {
        let { data } = await getRequest(`${this._baseUrl}/all`)
        return data
    }


    // ACTIVE INACTIVE HANDLER
    async activeInactive(id, status = '') {
        let { isSuccess, data } = await getRequest(`${this._baseUrl}/verify/${id}?status=${status}`)

        if (!isSuccess && data)
            return isSuccess

        return this._paginationFormat(data)
    }


}

export default DataAction