Defined **endpoints** request for this App

 
**Base endpoints BATTLE**

 
  a) [Add Battle](#Add-Battle)
  b) [Get Battles](#Get-Battles)
  b) [Add Army](#Add-Army)
  b) [Add Attack strategy](#Add-Attack-strategy)


### Add Battle

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
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

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /battles/get-many | GET   | Gew Battles |

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

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
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

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
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