Urbiscor API!
===================

API
-------------

### Models

#### User
Name     | Type
-------- | ---
id		 | INT
login    | TEXT
password | TEXT
#### Place
Name     | Type
-------- | ---
id		 | INT
title    | TEXT
description | TEXT
point | GEOGRAPHY
creator_id | INT
category_id | INT
created | TIMESTAMP
time_start | TIMESTAMP
#### Category
Name     | Type
-------- | ---
id		 | INT
slug | TEXT
name | TEXT
#### Link_user_place
Name     | Type
-------- | ---
id		 | INT
user_id | INT
place_id| INT

### Response interface (JSON)
    {
	    result: 'OK' | 'ERR',
	    statusCode: number,
	    errorDescription: string,
	    data: Array
    }
### Methods
#### /api/user/

POST /create - создать user-а
```{login, password}```

GET /get-subscriptions/:userId - получить все места, на которые подписан user
```/?limit&offset&desc```

GET /get-places/:userId - получить все места, которые создал user
```/?limit&offset&desc```

GET /get/:userId - получить user-а

#### /api/category/
GET /get-all
#### /api/place/
POST /create - создать событие

    {
	    title: string,
		description: string,
	    categoryId: number,
	    creatorId: number,
	    point: Array[2]<number>,
	    timeStart: string // ex: 2007-10-04T23:08:10.0
	}
GET /get-all- все события
```/?limit&offset&desc```

GET /get-subscribers/:placeId - получить пользователей, подписанных на событие
```/?limit&offset```

GET /get-around- получить события, которые находятся в диапазоне заданной точки 
```/?lat&lng&limit&offset&step```
step - значение в метрах, указывающее в каком диапазоне искать
	
GET /subscribe - подписаться на событие
```/?userId&placeId```

GET /unsubscribe - отписаться с события
```/?userId&placeId```

DELETE /delete - удалить событие

    {
	    id: number - id удаляемого события
	    userId: number - id создателя события
	}
POST /update - обновить

    {
	    id: number - id удаляемого события
	    userId: number - id создателя события
	    //следующие параметры можно указывать не все
	    description: string,
	    title: string,
	    categoryId: number,
	    point: Array[2]<number>,
	    timeStart: string // ex: 2007-10-04T23:08:10.0
	}

