@catCoder

**Base endpoints BATTLE**

a) [Add Battle](#Add-Battle)

b) [Get Battles](#Get-Battles)

c) [Add Army](#Add-Army)

d) [Add Attack strategy](#Add-Attack-strategy)

e) [Get Eligible Games](#Get-Eligible-Games)

f) [Get Played results](#Get-Played-results)

### Add Battle

| Endpoint         | Method | Description      |
| ---------------- | ------ | ---------------- |
| /battles/add-one | POST   | Add a new Battle |

```javascript

// Request main.domain.com/battles/add-one
{
    "name": "Battle one"
}

// Response Status Code: 200
 {
    "success": true,
 }

```

### Get Battles

| Endpoint          | Method | Description |
| ----------------- | ------ | ----------- |
| /battles/get-many | GET    | Gew Battles |

```javascript

// Request main.domain.com/battles/get-many

// Response Status Code: 200
{
    "success": true,
    "data": [
        {
            "name": "kenya"
        },
        {
            "name": "kenya1"
        },
        {
            "name": "kenya2"
        }
    ]
}

```

### Add Army

| Endpoint        | Method | Description    |
| --------------- | ------ | -------------- |
| /armies/add-one | POST   | Add a new Army |

```javascript

// Request main.domain.com/armies/add-one
{
    "name":"kenya",
    "units":90,
    "battleId":2,
    "attackStrategyId":4
}

// Response Status Code: 200
 {
    "success": true,
 }

```

### Add Attack strategy

| Endpoint                 | Method | Description               |
| ------------------------ | ------ | ------------------------- |
| /attack-strategy/add-one | POST   | Add a new Attack strategy |

```javascript

// Request main.domain.com/attack-strategy/add-one
{
    "name":"weakest"
}

// Response Status Code: 200
 {
    "success": true,
 }

```

### Get Eligible Games

| Endpoint         | Method | Description                       |
| ---------------- | ------ | --------------------------------- |
| /games/get-legit | GET    | Get games with 3 armies and above |

```javascript

// Request main.domain.com/games/get-legit

// Response Status Code: 200
{
    success: true,
    data: [
        {
            "battle": "Battle 1",
            "army": "Army 1",
            "units": 90,
            "attack": "weakest"
        },
        {
            "battle": "Battle 1",
            "army": "Army 2",
            "units": 90,
            "attack": "weakest"
        },
        {
            "battle": "Battle 1",
            "army": "Army 3",
            "units": 90,
            "attack": "weakest"
        },
        {
            "battle": "Battle 3",
            "army": "Army one",
            "units": 90,
            "attack": "weakest"
        },
        {
            "battle": "Battle 3",
            "army": "Army Two",
            "units": 90,
            "attack": "random"
        },
        {
            "battle": "Battle 3",
            "army": "Army Three",
            "units": 80,
            "attack": "strongest"
        }
    ]
}

```

### Get Game results

| Endpoint            | Method | Description                                                       |
| ------------------- | ------ | ----------------------------------------------------------------- |
| /games/played-games | GET    | Get Played games - For current Game, results are served on socket |

```javascript

// Request main.domain.com/games/played-games

// Response Status Code: 200
{
    "success": true,
    "data": [
        {
            "results": "[{\"battle\":\"Battle 1\",\"army\":\"Army 1\",\"_id\":1,\"battleid\":\"1\",\"units\":90,\"attack\":\"weakest\"},{\"battle\":\"Battle 1\",\"army\":\"Army 2\",\"_id\":3,\"battleid\":\"1\",\"units\":5.625,\"attack\":\"weakest\"},{\"battle\":\"Battle 1\",\"army\":\"Army 3\",\"_id\":4,\"battleid\":\"1\",\"units\":0,\"attack\":\"weakest\"},{\"battle\":\"Battle 1\",\"army\":\"wewe1\",\"_id\":12,\"battleid\":\"1\",\"units\":0,\"attack\":\"random\"},{\"battle\":\"Battle 3\",\"army\":\"Army one\",\"_id\":6,\"battleid\":\"4\",\"units\":11.25,\"attack\":\"weakest\"},{\"battle\":\"Battle 3\",\"army\":\"Army Two\",\"_id\":8,\"battleid\":\"4\",\"units\":1.40625,\"attack\":\"random\"},{\"battle\":\"Battle 3\",\"army\":\"Army Three\",\"_id\":9,\"battleid\":\"4\",\"units\":0,\"attack\":\"strongest\"},{\"battle\":\"Battle 3\",\"army\":\"wewe5\",\"_id\":20,\"battleid\":\"4\",\"units\":5.625,\"attack\":\"strongest\"}]",
            "_id": 1
        }
    ]
}
```
