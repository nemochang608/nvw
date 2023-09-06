# Documentation

## install

```
pip install nvw
```

## build

### Pre-requisite

- nvm (npm)
- python & pip

create `.env` under `./node`

Currently only 'JSONPATH' variable is needed.
It is used by frontend in order to get URL paths for rest api.
json is served at static/settings.json by default.
So you can specify:

```sh
JSONPATH=static/settings.json
```

Then build and install:

```sh
cd node
nvm use
npm install
cd ..
./build.sh
pip install dist/nvw*
```

## run

Generate template:

```
nvw-confgen
```

Copy `./nvw/settings-template.py` to `$HOME/.nvw/settings.py` and edit it.

Then

```
nvw-launch
```


## topology

Topology map is available.
If you use topology map, you need to set 'topology_command' variable in 'settings.py' and the command need to output json to stdout.

sample output:

```json
{
  "topology": {
    "value": {
      "edges": [
        {
          "name": "link-01",
          "nodes": [
            "r1.env5",
            "r2.env5"
          ]
        },
        {
          "name": "link-02",
          "nodes": [
            "r2.env5",
            "r3.env5"
          ]
        }
      ],
      "nodes": [
        {
          "name": "r1.env5",
          "password": "pasword",
          "type": "junos",
          "user": "user"
        },
        {
          "name": "r2.env5",
          "password": "pasword",
          "type": "junos",
          "user": "user"
        },
        {
          "name": "r3.env5",
          "password": "pasword",
          "type": "junos",
          "user": "user"
        }
      ]
    }
  }
}
```


## View device configuration in the viewer


Create gRPC server for each device type
and put the address to `~/.nvw/settings.py`.

protobuf spec is below:


```
syntax = "proto3";

enum ErrorType {
  NOT_IMPLEMENT = 0;
  UNKNOWN = 1;
}

message Device {
  string host = 1;
  string user = 2;
  string password = 3;
}

message ConfigText {
  string text = 1;
}

message ConfigRequest {
  Device device = 1;
  ConfigText config_text = 2;
}

message CommandText {
  string text = 1;
}

message CommandRequest {
  Device device = 1;
  CommandText command_text = 2;
}

message ErrorMessage {
  ErrorType type = 1;
  string message = 2;
}

message Result {
  bool error = 1;
  ErrorMessage error_message = 2;
  string output = 3;
}

service Config {
  rpc get(Device) returns (ConfigText);
  rpc set(ConfigRequest) returns (Result);
  rpc compare(ConfigRequest) returns (Result);
}

service Command {
  rpc execute(CommandRequest) returns (Result);
}
```

