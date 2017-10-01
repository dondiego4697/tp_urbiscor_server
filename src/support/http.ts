export interface ClientResponse {
    result: 'OK' | 'ERR',
    statusCode: number,
    errorDescription?: string,
    data?: object
}

export function SUCCESS(data?: object): ClientResponse {
    return {
        statusCode: 200,
        result: 'OK',
        data: data ? data : {}
    }
}

export function SERVER_ERROR(desc?: string): ClientResponse {
    return {
        errorDescription: `something wrong, repeat later ${desc}`,
        statusCode: 500,
        result: 'ERR'
    }
}

export function WRONG_PARAMS(err: any): ClientResponse {
    return {
        statusCode: 400,
        result: 'ERR',
        errorDescription: err.detail || err.message || 'wrong params'
    }
}

export function sendData(res, result: ClientResponse): void {
    res
        .set('Content-Type', 'application/json')
        .status(result.statusCode)
        .send(result);
}