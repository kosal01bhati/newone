import { NodeType } from "./model";
export const recipeMock = {
  id: "recipe-id-0002",
  name: "Calculate TIF coverage",
  owner: {
    id: "user-id-0001",
    fullName: "System administrator",
    email: "admin@example.com",
    groups: [
      {
        id: "group-id-0003",
        name: "Administrators",
        description: "System administrators"
      },
      {
        id: "group-id-0004",
        name: "Everyone"
      }
    ]
  },
  groups: [
    {
      id: "group-id-0004",
      name: "Everyone"
    }
  ],
  stages: [
    {
      id: "stage-id-0002",
      order: 1,
      job: {
        id: "job-id-0002",
        name: "Coverage TIF",
        owner: {
          id: "user-id-0001",
          fullName: "System administrator",
          email: "admin@example.com",
          groups: [
            {
              id: "group-id-0003",
              name: "Administrators",
              description: "System administrators"
            },
            {
              id: "group-id-0004",
              name: "Everyone"
            }
          ]
        },
        type: "program",
        isSingleThread: true,
        groups: [
          {
            id: "group-id-0004",
            name: "Everyone"
          }
        ],
        description: "Calculates coverage with HTZ and saves it to TIF",
        OS: ["windows"],
        calls: [
          {
            id: "call-id-0002",
            system: "windows",
            command:
              '"C:/ATDI/HTZ communications x64/htz.cmd" coverage-calc-tif       --network={{ network }}       --terrain={{ terrain }}       --clutter={{ clutter }}       --building={{ building }}       --parameter={{ parameter }}'
          }
        ],
        inputs: [
          {
            id: "input-id-0001",
            name: "Network file",
            ident: "network",
            isArray: false,
            isRequired: true,
            type: "file",
            extensions: ["EWFx"]
          },
          {
            id: "input-id-0002",
            name: "Terrain file",
            ident: "terrain",
            isArray: false,
            isRequired: true,
            type: "file",
            extensions: ["GEO", "RGE"]
          },
          {
            id: "input-id-0003",
            name: "Clutter file",
            ident: "clutter",
            isArray: false,
            isRequired: false,
            type: "file",
            extensions: ["SOL", "RSO"]
          },
          {
            id: "input-id-0004",
            name: "Building file",
            ident: "building",
            isArray: false,
            isRequired: false,
            type: "file",
            extensions: ["BLG", "RBL"]
          },
          {
            id: "input-id-0005",
            name: "Parameter file",
            ident: "parameter",
            isArray: false,
            isRequired: false,
            type: "file",
            extensions: ["PRM"]
          }
        ],
        outputs: [
          {
            id: "output-id-0002",
            name: "Coverage in TIF",
            ident: "coverage",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              type: "search",
              relativeDir: ".",
              namePattern: "*.TIF"
            }
          }
        ],
        inputData: {
          "input-id-0001": {
            type: "file",
            name: "Network file",
            value: {
              id: "file-id-0001",
              name: "test.EWFx",
              relativePath: "test_0000000001.EWFx",
              size: 55183,
              checksum:
                "4eb7990588f6a5677d6ac79de2124ec8d7f1f26ca3ee8eb57df8f3a36b63c12d"
            }
          },
          "input-id-0002": {
            type: "file",
            name: "Terrain file",
            value: {
              id: "file-id-0002",
              name: "test.GEO",
              relativePath: "test_0000000002.GEO",
              size: 277266,
              checksum:
                "f9ab1fdbafa93175e2f28070f773b1d88c40c7587240b7b5fac9ea654df71336"
            }
          },
          "input-id-0003": {
            type: "file",
            name: "Clutter file",
            value: {
              id: "file-id-0003",
              name: "test.SOL",
              relativePath: "test_0000000003.SOL",
              size: 139138,
              checksum:
                "0b1938fc88cb251c6565cf799d6041d7d46b9cccef222efb76f34f56d19dcb09"
            }
          },
          "input-id-0004": {
            type: "file",
            name: "Parameter file",
            value: {
              id: "file-id-0004",
              name: "test.PRM",
              relativePath: "test_0000000004.PRM",
              size: 190234,
              checksum:
                "035056f1d4be114937e9b8aab19ca1d74ca9a96eb049b34bcaafbbc248aeb49e"
            }
          }
        },
        outputData: {
          "output-id-0002": {
            type: "file",
            name: "Coverage in TIF",
            value: {
              id: "file-id-0005",
              name: "output.TIF",
              relativePath: "test_0000000005.PRM",
              size: 30066,
              checksum:
                "ac736b15a4a4bdcc12f485292a39b7973b50d3a8973616446f4b738ee50c4b05"
            }
          }
        }
      }
    }
  ],
  pipes: [
    {
      id: "pipe-id-0001",
      type: "input",
      to: {
        stage: {
          id: "stage-id-0002",
          order: 1,
          job: {
            id: "job-id-0002",
            name: "Coverage TIF",
            owner: {
              id: "user-id-0001",
              fullName: "System administrator",
              email: "admin@example.com",
              groups: [
                {
                  id: "group-id-0003",
                  name: "Administrators",
                  description: "System administrators"
                },
                {
                  id: "group-id-0004",
                  name: "Everyone"
                }
              ]
            },
            type: "program",
            isSingleThread: true,
            groups: [
              {
                id: "group-id-0004",
                name: "Everyone"
              }
            ],
            description: "Calculates coverage with HTZ and saves it to TIF",
            OS: ["windows"],
            calls: [
              {
                id: "call-id-0002",
                system: "windows",
                command:
                  '"C:/ATDI/HTZ communications x64/htz.cmd" coverage-calc-tif       --network={{ network }}       --terrain={{ terrain }}       --clutter={{ clutter }}       --building={{ building }}       --parameter={{ parameter }}'
              }
            ],
            inputs: [
              {
                id: "input-id-0001",
                name: "Network file",
                ident: "network",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["EWFx"]
              },
              {
                id: "input-id-0002",
                name: "Terrain file",
                ident: "terrain",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["GEO", "RGE"]
              },
              {
                id: "input-id-0003",
                name: "Clutter file",
                ident: "clutter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["SOL", "RSO"]
              },
              {
                id: "input-id-0004",
                name: "Building file",
                ident: "building",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["BLG", "RBL"]
              },
              {
                id: "input-id-0005",
                name: "Parameter file",
                ident: "parameter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["PRM"]
              }
            ],
            outputs: [
              {
                id: "output-id-0002",
                name: "Coverage in TIF",
                ident: "coverage",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.TIF"
                }
              }
            ],
            inputData: {
              "input-id-0001": {
                type: "file",
                name: "Network file",
                value: {
                  id: "file-id-0001",
                  name: "test.EWFx",
                  relativePath: "test_0000000001.EWFx",
                  size: 55183,
                  checksum:
                    "4eb7990588f6a5677d6ac79de2124ec8d7f1f26ca3ee8eb57df8f3a36b63c12d"
                }
              },
              "input-id-0002": {
                type: "file",
                name: "Terrain file",
                value: {
                  id: "file-id-0002",
                  name: "test.GEO",
                  relativePath: "test_0000000002.GEO",
                  size: 277266,
                  checksum:
                    "f9ab1fdbafa93175e2f28070f773b1d88c40c7587240b7b5fac9ea654df71336"
                }
              },
              "input-id-0003": {
                type: "file",
                name: "Clutter file",
                value: {
                  id: "file-id-0003",
                  name: "test.SOL",
                  relativePath: "test_0000000003.SOL",
                  size: 139138,
                  checksum:
                    "0b1938fc88cb251c6565cf799d6041d7d46b9cccef222efb76f34f56d19dcb09"
                }
              },
              "input-id-0004": {
                type: "file",
                name: "Parameter file",
                value: {
                  id: "file-id-0004",
                  name: "test.PRM",
                  relativePath: "test_0000000004.PRM",
                  size: 190234,
                  checksum:
                    "035056f1d4be114937e9b8aab19ca1d74ca9a96eb049b34bcaafbbc248aeb49e"
                }
              }
            },
            outputData: {
              "output-id-0002": {
                type: "file",
                name: "Coverage in TIF",
                value: {
                  id: "file-id-0005",
                  name: "output.TIF",
                  relativePath: "test_0000000005.PRM",
                  size: 30066,
                  checksum:
                    "ac736b15a4a4bdcc12f485292a39b7973b50d3a8973616446f4b738ee50c4b05"
                }
              }
            }
          }
        },
        input: {
          id: "input-id-0001",
          name: "Network file",
          ident: "network",
          isArray: false,
          isRequired: true,
          type: "file",
          extensions: ["EWFx"]
        }
      }
    },
    {
      id: "pipe-id-0002",
      type: "input",
      to: {
        stage: {
          id: "stage-id-0002",
          order: 1,
          job: {
            id: "job-id-0002",
            name: "Coverage TIF",
            owner: {
              id: "user-id-0001",
              fullName: "System administrator",
              email: "admin@example.com",
              groups: [
                {
                  id: "group-id-0003",
                  name: "Administrators",
                  description: "System administrators"
                },
                {
                  id: "group-id-0004",
                  name: "Everyone"
                }
              ]
            },
            type: "program",
            isSingleThread: true,
            groups: [
              {
                id: "group-id-0004",
                name: "Everyone"
              }
            ],
            description: "Calculates coverage with HTZ and saves it to TIF",
            OS: ["windows"],
            calls: [
              {
                id: "call-id-0002",
                system: "windows",
                command:
                  '"C:/ATDI/HTZ communications x64/htz.cmd" coverage-calc-tif       --network={{ network }}       --terrain={{ terrain }}       --clutter={{ clutter }}       --building={{ building }}       --parameter={{ parameter }}'
              }
            ],
            inputs: [
              {
                id: "input-id-0001",
                name: "Network file",
                ident: "network",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["EWFx"]
              },
              {
                id: "input-id-0002",
                name: "Terrain file",
                ident: "terrain",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["GEO", "RGE"]
              },
              {
                id: "input-id-0003",
                name: "Clutter file",
                ident: "clutter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["SOL", "RSO"]
              },
              {
                id: "input-id-0004",
                name: "Building file",
                ident: "building",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["BLG", "RBL"]
              },
              {
                id: "input-id-0005",
                name: "Parameter file",
                ident: "parameter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["PRM"]
              }
            ],
            outputs: [
              {
                id: "output-id-0002",
                name: "Coverage in TIF",
                ident: "coverage",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.TIF"
                }
              }
            ],
            inputData: {
              "input-id-0001": {
                type: "file",
                name: "Network file",
                value: {
                  id: "file-id-0001",
                  name: "test.EWFx",
                  relativePath: "test_0000000001.EWFx",
                  size: 55183,
                  checksum:
                    "4eb7990588f6a5677d6ac79de2124ec8d7f1f26ca3ee8eb57df8f3a36b63c12d"
                }
              },
              "input-id-0002": {
                type: "file",
                name: "Terrain file",
                value: {
                  id: "file-id-0002",
                  name: "test.GEO",
                  relativePath: "test_0000000002.GEO",
                  size: 277266,
                  checksum:
                    "f9ab1fdbafa93175e2f28070f773b1d88c40c7587240b7b5fac9ea654df71336"
                }
              },
              "input-id-0003": {
                type: "file",
                name: "Clutter file",
                value: {
                  id: "file-id-0003",
                  name: "test.SOL",
                  relativePath: "test_0000000003.SOL",
                  size: 139138,
                  checksum:
                    "0b1938fc88cb251c6565cf799d6041d7d46b9cccef222efb76f34f56d19dcb09"
                }
              },
              "input-id-0004": {
                type: "file",
                name: "Parameter file",
                value: {
                  id: "file-id-0004",
                  name: "test.PRM",
                  relativePath: "test_0000000004.PRM",
                  size: 190234,
                  checksum:
                    "035056f1d4be114937e9b8aab19ca1d74ca9a96eb049b34bcaafbbc248aeb49e"
                }
              }
            },
            outputData: {
              "output-id-0002": {
                type: "file",
                name: "Coverage in TIF",
                value: {
                  id: "file-id-0005",
                  name: "output.TIF",
                  relativePath: "test_0000000005.PRM",
                  size: 30066,
                  checksum:
                    "ac736b15a4a4bdcc12f485292a39b7973b50d3a8973616446f4b738ee50c4b05"
                }
              }
            }
          }
        },
        input: {
          id: "input-id-0002",
          name: "Terrain file",
          ident: "terrain",
          isArray: false,
          isRequired: true,
          type: "file",
          extensions: ["GEO", "RGE"]
        }
      }
    },
    {
      id: "pipe-id-0003",
      type: "input",
      to: {
        stage: {
          id: "stage-id-0002",
          order: 1,
          job: {
            id: "job-id-0002",
            name: "Coverage TIF",
            owner: {
              id: "user-id-0001",
              fullName: "System administrator",
              email: "admin@example.com",
              groups: [
                {
                  id: "group-id-0003",
                  name: "Administrators",
                  description: "System administrators"
                },
                {
                  id: "group-id-0004",
                  name: "Everyone"
                }
              ]
            },
            type: "program",
            isSingleThread: true,
            groups: [
              {
                id: "group-id-0004",
                name: "Everyone"
              }
            ],
            description: "Calculates coverage with HTZ and saves it to TIF",
            OS: ["windows"],
            calls: [
              {
                id: "call-id-0002",
                system: "windows",
                command:
                  '"C:/ATDI/HTZ communications x64/htz.cmd" coverage-calc-tif       --network={{ network }}       --terrain={{ terrain }}       --clutter={{ clutter }}       --building={{ building }}       --parameter={{ parameter }}'
              }
            ],
            inputs: [
              {
                id: "input-id-0001",
                name: "Network file",
                ident: "network",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["EWFx"]
              },
              {
                id: "input-id-0002",
                name: "Terrain file",
                ident: "terrain",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["GEO", "RGE"]
              },
              {
                id: "input-id-0003",
                name: "Clutter file",
                ident: "clutter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["SOL", "RSO"]
              },
              {
                id: "input-id-0004",
                name: "Building file",
                ident: "building",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["BLG", "RBL"]
              },
              {
                id: "input-id-0005",
                name: "Parameter file",
                ident: "parameter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["PRM"]
              }
            ],
            outputs: [
              {
                id: "output-id-0002",
                name: "Coverage in TIF",
                ident: "coverage",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.TIF"
                }
              }
            ],
            inputData: {
              "input-id-0001": {
                type: "file",
                name: "Network file",
                value: {
                  id: "file-id-0001",
                  name: "test.EWFx",
                  relativePath: "test_0000000001.EWFx",
                  size: 55183,
                  checksum:
                    "4eb7990588f6a5677d6ac79de2124ec8d7f1f26ca3ee8eb57df8f3a36b63c12d"
                }
              },
              "input-id-0002": {
                type: "file",
                name: "Terrain file",
                value: {
                  id: "file-id-0002",
                  name: "test.GEO",
                  relativePath: "test_0000000002.GEO",
                  size: 277266,
                  checksum:
                    "f9ab1fdbafa93175e2f28070f773b1d88c40c7587240b7b5fac9ea654df71336"
                }
              },
              "input-id-0003": {
                type: "file",
                name: "Clutter file",
                value: {
                  id: "file-id-0003",
                  name: "test.SOL",
                  relativePath: "test_0000000003.SOL",
                  size: 139138,
                  checksum:
                    "0b1938fc88cb251c6565cf799d6041d7d46b9cccef222efb76f34f56d19dcb09"
                }
              },
              "input-id-0004": {
                type: "file",
                name: "Parameter file",
                value: {
                  id: "file-id-0004",
                  name: "test.PRM",
                  relativePath: "test_0000000004.PRM",
                  size: 190234,
                  checksum:
                    "035056f1d4be114937e9b8aab19ca1d74ca9a96eb049b34bcaafbbc248aeb49e"
                }
              }
            },
            outputData: {
              "output-id-0002": {
                type: "file",
                name: "Coverage in TIF",
                value: {
                  id: "file-id-0005",
                  name: "output.TIF",
                  relativePath: "test_0000000005.PRM",
                  size: 30066,
                  checksum:
                    "ac736b15a4a4bdcc12f485292a39b7973b50d3a8973616446f4b738ee50c4b05"
                }
              }
            }
          }
        },
        input: {
          id: "input-id-0003",
          name: "Clutter file",
          ident: "clutter",
          isArray: false,
          isRequired: false,
          type: "file",
          extensions: ["SOL", "RSO"]
        }
      }
    },
    {
      id: "pipe-id-0004",
      type: "input",
      to: {
        stage: {
          id: "stage-id-0002",
          order: 1,
          job: {
            id: "job-id-0002",
            name: "Coverage TIF",
            owner: {
              id: "user-id-0001",
              fullName: "System administrator",
              email: "admin@example.com",
              groups: [
                {
                  id: "group-id-0003",
                  name: "Administrators",
                  description: "System administrators"
                },
                {
                  id: "group-id-0004",
                  name: "Everyone"
                }
              ]
            },
            type: "program",
            isSingleThread: true,
            groups: [
              {
                id: "group-id-0004",
                name: "Everyone"
              }
            ],
            description: "Calculates coverage with HTZ and saves it to TIF",
            OS: ["windows"],
            calls: [
              {
                id: "call-id-0002",
                system: "windows",
                command:
                  '"C:/ATDI/HTZ communications x64/htz.cmd" coverage-calc-tif       --network={{ network }}       --terrain={{ terrain }}       --clutter={{ clutter }}       --building={{ building }}       --parameter={{ parameter }}'
              }
            ],
            inputs: [
              {
                id: "input-id-0001",
                name: "Network file",
                ident: "network",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["EWFx"]
              },
              {
                id: "input-id-0002",
                name: "Terrain file",
                ident: "terrain",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["GEO", "RGE"]
              },
              {
                id: "input-id-0003",
                name: "Clutter file",
                ident: "clutter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["SOL", "RSO"]
              },
              {
                id: "input-id-0004",
                name: "Building file",
                ident: "building",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["BLG", "RBL"]
              },
              {
                id: "input-id-0005",
                name: "Parameter file",
                ident: "parameter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["PRM"]
              }
            ],
            outputs: [
              {
                id: "output-id-0002",
                name: "Coverage in TIF",
                ident: "coverage",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.TIF"
                }
              }
            ],
            inputData: {
              "input-id-0001": {
                type: "file",
                name: "Network file",
                value: {
                  id: "file-id-0001",
                  name: "test.EWFx",
                  relativePath: "test_0000000001.EWFx",
                  size: 55183,
                  checksum:
                    "4eb7990588f6a5677d6ac79de2124ec8d7f1f26ca3ee8eb57df8f3a36b63c12d"
                }
              },
              "input-id-0002": {
                type: "file",
                name: "Terrain file",
                value: {
                  id: "file-id-0002",
                  name: "test.GEO",
                  relativePath: "test_0000000002.GEO",
                  size: 277266,
                  checksum:
                    "f9ab1fdbafa93175e2f28070f773b1d88c40c7587240b7b5fac9ea654df71336"
                }
              },
              "input-id-0003": {
                type: "file",
                name: "Clutter file",
                value: {
                  id: "file-id-0003",
                  name: "test.SOL",
                  relativePath: "test_0000000003.SOL",
                  size: 139138,
                  checksum:
                    "0b1938fc88cb251c6565cf799d6041d7d46b9cccef222efb76f34f56d19dcb09"
                }
              },
              "input-id-0004": {
                type: "file",
                name: "Parameter file",
                value: {
                  id: "file-id-0004",
                  name: "test.PRM",
                  relativePath: "test_0000000004.PRM",
                  size: 190234,
                  checksum:
                    "035056f1d4be114937e9b8aab19ca1d74ca9a96eb049b34bcaafbbc248aeb49e"
                }
              }
            },
            outputData: {
              "output-id-0002": {
                type: "file",
                name: "Coverage in TIF",
                value: {
                  id: "file-id-0005",
                  name: "output.TIF",
                  relativePath: "test_0000000005.PRM",
                  size: 30066,
                  checksum:
                    "ac736b15a4a4bdcc12f485292a39b7973b50d3a8973616446f4b738ee50c4b05"
                }
              }
            }
          }
        },
        input: {
          id: "input-id-0004",
          name: "Building file",
          ident: "building",
          isArray: false,
          isRequired: false,
          type: "file",
          extensions: ["BLG", "RBL"]
        }
      }
    },
    {
      id: "pipe-id-0005",
      type: "input",
      to: {
        stage: {
          id: "stage-id-0002",
          order: 1,
          job: {
            id: "job-id-0002",
            name: "Coverage TIF",
            owner: {
              id: "user-id-0001",
              fullName: "System administrator",
              email: "admin@example.com",
              groups: [
                {
                  id: "group-id-0003",
                  name: "Administrators",
                  description: "System administrators"
                },
                {
                  id: "group-id-0004",
                  name: "Everyone"
                }
              ]
            },
            type: "program",
            isSingleThread: true,
            groups: [
              {
                id: "group-id-0004",
                name: "Everyone"
              }
            ],
            description: "Calculates coverage with HTZ and saves it to TIF",
            OS: ["windows"],
            calls: [
              {
                id: "call-id-0002",
                system: "windows",
                command:
                  '"C:/ATDI/HTZ communications x64/htz.cmd" coverage-calc-tif       --network={{ network }}       --terrain={{ terrain }}       --clutter={{ clutter }}       --building={{ building }}       --parameter={{ parameter }}'
              }
            ],
            inputs: [
              {
                id: "input-id-0001",
                name: "Network file",
                ident: "network",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["EWFx"]
              },
              {
                id: "input-id-0002",
                name: "Terrain file",
                ident: "terrain",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["GEO", "RGE"]
              },
              {
                id: "input-id-0003",
                name: "Clutter file",
                ident: "clutter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["SOL", "RSO"]
              },
              {
                id: "input-id-0004",
                name: "Building file",
                ident: "building",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["BLG", "RBL"]
              },
              {
                id: "input-id-0005",
                name: "Parameter file",
                ident: "parameter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["PRM"]
              }
            ],
            outputs: [
              {
                id: "output-id-0002",
                name: "Coverage in TIF",
                ident: "coverage",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.TIF"
                }
              }
            ],
            inputData: {
              "input-id-0001": {
                type: "file",
                name: "Network file",
                value: {
                  id: "file-id-0001",
                  name: "test.EWFx",
                  relativePath: "test_0000000001.EWFx",
                  size: 55183,
                  checksum:
                    "4eb7990588f6a5677d6ac79de2124ec8d7f1f26ca3ee8eb57df8f3a36b63c12d"
                }
              },
              "input-id-0002": {
                type: "file",
                name: "Terrain file",
                value: {
                  id: "file-id-0002",
                  name: "test.GEO",
                  relativePath: "test_0000000002.GEO",
                  size: 277266,
                  checksum:
                    "f9ab1fdbafa93175e2f28070f773b1d88c40c7587240b7b5fac9ea654df71336"
                }
              },
              "input-id-0003": {
                type: "file",
                name: "Clutter file",
                value: {
                  id: "file-id-0003",
                  name: "test.SOL",
                  relativePath: "test_0000000003.SOL",
                  size: 139138,
                  checksum:
                    "0b1938fc88cb251c6565cf799d6041d7d46b9cccef222efb76f34f56d19dcb09"
                }
              },
              "input-id-0004": {
                type: "file",
                name: "Parameter file",
                value: {
                  id: "file-id-0004",
                  name: "test.PRM",
                  relativePath: "test_0000000004.PRM",
                  size: 190234,
                  checksum:
                    "035056f1d4be114937e9b8aab19ca1d74ca9a96eb049b34bcaafbbc248aeb49e"
                }
              }
            },
            outputData: {
              "output-id-0002": {
                type: "file",
                name: "Coverage in TIF",
                value: {
                  id: "file-id-0005",
                  name: "output.TIF",
                  relativePath: "test_0000000005.PRM",
                  size: 30066,
                  checksum:
                    "ac736b15a4a4bdcc12f485292a39b7973b50d3a8973616446f4b738ee50c4b05"
                }
              }
            }
          }
        },
        input: {
          id: "input-id-0005",
          name: "Parameter file",
          ident: "parameter",
          isArray: false,
          isRequired: false,
          type: "file",
          extensions: ["PRM"]
        }
      }
    },
    {
      id: "pipe-id-0006",
      type: "output",
      from: {
        stage: {
          id: "stage-id-0002",
          order: 1,
          job: {
            id: "job-id-0002",
            name: "Coverage TIF",
            owner: {
              id: "user-id-0001",
              fullName: "System administrator",
              email: "admin@example.com",
              groups: [
                {
                  id: "group-id-0003",
                  name: "Administrators",
                  description: "System administrators"
                },
                {
                  id: "group-id-0004",
                  name: "Everyone"
                }
              ]
            },
            type: "program",
            isSingleThread: true,
            groups: [
              {
                id: "group-id-0004",
                name: "Everyone"
              }
            ],
            description: "Calculates coverage with HTZ and saves it to TIF",
            OS: ["windows"],
            calls: [
              {
                id: "call-id-0002",
                system: "windows",
                command:
                  '"C:/ATDI/HTZ communications x64/htz.cmd" coverage-calc-tif       --network={{ network }}       --terrain={{ terrain }}       --clutter={{ clutter }}       --building={{ building }}       --parameter={{ parameter }}'
              }
            ],
            inputs: [
              {
                id: "input-id-0001",
                name: "Network file",
                ident: "network",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["EWFx"]
              },
              {
                id: "input-id-0002",
                name: "Terrain file",
                ident: "terrain",
                isArray: false,
                isRequired: true,
                type: "file",
                extensions: ["GEO", "RGE"]
              },
              {
                id: "input-id-0003",
                name: "Clutter file",
                ident: "clutter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["SOL", "RSO"]
              },
              {
                id: "input-id-0004",
                name: "Building file",
                ident: "building",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["BLG", "RBL"]
              },
              {
                id: "input-id-0005",
                name: "Parameter file",
                ident: "parameter",
                isArray: false,
                isRequired: false,
                type: "file",
                extensions: ["PRM"]
              }
            ],
            outputs: [
              {
                id: "output-id-0002",
                name: "Coverage in TIF",
                ident: "coverage",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.TIF"
                }
              }
            ],
            inputData: {
              "input-id-0001": {
                type: "file",
                name: "Network file",
                value: {
                  id: "file-id-0001",
                  name: "test.EWFx",
                  relativePath: "test_0000000001.EWFx",
                  size: 55183,
                  checksum:
                    "4eb7990588f6a5677d6ac79de2124ec8d7f1f26ca3ee8eb57df8f3a36b63c12d"
                }
              },
              "input-id-0002": {
                type: "file",
                name: "Terrain file",
                value: {
                  id: "file-id-0002",
                  name: "test.GEO",
                  relativePath: "test_0000000002.GEO",
                  size: 277266,
                  checksum:
                    "f9ab1fdbafa93175e2f28070f773b1d88c40c7587240b7b5fac9ea654df71336"
                }
              },
              "input-id-0003": {
                type: "file",
                name: "Clutter file",
                value: {
                  id: "file-id-0003",
                  name: "test.SOL",
                  relativePath: "test_0000000003.SOL",
                  size: 139138,
                  checksum:
                    "0b1938fc88cb251c6565cf799d6041d7d46b9cccef222efb76f34f56d19dcb09"
                }
              },
              "input-id-0004": {
                type: "file",
                name: "Parameter file",
                value: {
                  id: "file-id-0004",
                  name: "test.PRM",
                  relativePath: "test_0000000004.PRM",
                  size: 190234,
                  checksum:
                    "035056f1d4be114937e9b8aab19ca1d74ca9a96eb049b34bcaafbbc248aeb49e"
                }
              }
            },
            outputData: {
              "output-id-0002": {
                type: "file",
                name: "Coverage in TIF",
                value: {
                  id: "file-id-0005",
                  name: "output.TIF",
                  relativePath: "test_0000000005.PRM",
                  size: 30066,
                  checksum:
                    "ac736b15a4a4bdcc12f485292a39b7973b50d3a8973616446f4b738ee50c4b05"
                }
              }
            }
          }
        },
        output: {
          id: "output-id-0002",
          name: "Coverage in TIF",
          ident: "coverage",
          isArray: false,
          isRequired: true,
          type: "file",
          descriptor: {
            type: "search",
            relativeDir: ".",
            namePattern: "*.TIF"
          }
        }
      }
    }
  ],
  inputs: [
    {
      id: "input-id-0001",
      name: "Network file",
      ident: "network",
      isArray: false,
      isRequired: true,
      type: "file",
      extensions: ["EWFx"]
    },
    {
      id: "input-id-0002",
      name: "Terrain file",
      ident: "terrain",
      isArray: false,
      isRequired: true,
      type: "file",
      extensions: ["GEO", "RGE"]
    },
    {
      id: "input-id-0003",
      name: "Clutter file",
      ident: "clutter",
      isArray: false,
      isRequired: false,
      type: "file",
      extensions: ["SOL", "RSO"]
    },
    {
      id: "input-id-0004",
      name: "Building file",
      ident: "building",
      isArray: false,
      isRequired: false,
      type: "file",
      extensions: ["BLG", "RBL"]
    },
    {
      id: "input-id-0005",
      name: "Parameter file",
      ident: "parameter",
      isArray: false,
      isRequired: false,
      type: "file",
      extensions: ["PRM"]
    }
  ],
  outputs: [
    {
      id: "output-id-0002",
      name: "Coverage in TIF",
      ident: "coverage",
      isArray: false,
      isRequired: true,
      type: "file",
      descriptor: {
        type: "search",
        relativeDir: ".",
        namePattern: "*.TIF"
      }
    }
  ],
  meta: {
    position: {}
  }
};
/*
!!!!!!!!! old data recipe !!!!!!!
export const recipeMock = {
  id: "recipe-id-0002",
  name: "Coverage calculation",
  owner: {
    id: "user-id-0002",
    fullName: "System User",
    email: "user@example.com",
    groups: [
      {
        id: "group-id-0002",
        name: "RF department",
        description: "Users from RF department"
      },
      {
        id: "group-id-0004",
        name: "Everyone"
      }
    ]
  },
  groups: [
    {
      id: "group-id-0002",
      name: "RF department",
      description: "Users from RF department"
    },
    {
      id: "group-id-0004",
      name: "Everyone"
    }
  ],
  stages: [
    {
      id: "stage-id-0002",
      order: 1,
      job: {
        id: "job-id-0002",
        name: "Project generation",
        owner: {
          id: "user-id-0001",
          fullName: "System administrator",
          email: "admin@example.com",
          groups: [
            {
              id: "group-id-0004",
              name: "Everyone"
            },
            {
              id: "group-id-0003",
              name: "Administrators",
              description: "System administrators"
            }
          ]
        },
        type: "script",
        isSingleThread: true,
        groups: [
          {
            id: "group-id-0004",
            name: "Everyone"
          }
        ],
        description: "HTZ coverage calculation",
        OS: ["windows"],
        calls: [
          {
            id: "call-id-0002",
            system: "windows",
            command:
              "prm-gen.bat {{prm-file}} {{ewf-file}} {{geo-file}} {{sol-file}} {{blg-file}}"
          }
        ],
        inputs: [
          {
            id: "input-id-0001",
            name: "Network file",
            ident: "ewf-file",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              extensions: ["EWFx"]
            }
          },
          {
            id: "input-id-0002",
            name: "Parameters file",
            ident: "prm-file",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              extensions: ["PRM"]
            }
          },
          {
            id: "input-id-0003",
            name: "DTM layer file",
            ident: "geo-file",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              extensions: ["GEO"]
            }
          },
          {
            id: "input-id-0004",
            name: "Clutter layer file",
            ident: "sol-file",
            isArray: false,
            isRequired: false,
            type: "file",
            descriptor: {
              extensions: ["SOL"]
            }
          },
          {
            id: "input-id-0005",
            name: "Building layer file",
            ident: "blg-file",
            isArray: false,
            isRequired: false,
            type: "file",
            descriptor: {
              extensions: ["BLG"]
            }
          }
        ],
        outputs: [
          {
            id: "output-id-0002",
            name: "Generated PROx file",
            ident: "pro-file-out",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              type: "search",
              relativeDir: "",
              namePattern: "*.PRM"
            }
          },
          {
            id: "output-id-0003",
            name: "Forwarded PRM file",
            ident: "prm-file",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              type: "search",
              relativeDir: ".",
              namePattern: "*.PRM"
            }
          },
          {
            id: "output-id-0004",
            name: "Forwarded GEO file",
            ident: "geo-file-out",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              type: "search",
              relativeDir: ".",
              namePattern: "*.GEO"
            }
          },
          {
            id: "output-id-0005",
            name: "Forwarded SOL file",
            ident: "sol-file-out",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              type: "search",
              relativeDir: ".",
              namePattern: "*.SOL"
            }
          },
          {
            id: "output-id-0006",
            name: "Forwarded SOL file",
            ident: "blg-file-out",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              type: "search",
              relativeDir: ".",
              namePattern: "*.BLG"
            }
          },
          {
            id: "output-id-0007",
            name: "Forwarded EWFx file",
            ident: "ewf-file-out",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              type: "search",
              relativeDir: "",
              namePattern: "*.EWFx"
            }
          }
        ],
        inputData: {},
        outputData: {}
      }
    },
    {
      id: "stage-id-0003",
      order: 2,
      job: {
        id: "job-id-0003",
        name: "Coverage calculation",
        owner: {
          id: "user-id-0001",
          fullName: "System administrator",
          email: "admin@example.com",
          groups: [
            {
              id: "group-id-0004",
              name: "Everyone"
            },
            {
              id: "group-id-0003",
              name: "Administrators",
              description: "System administrators"
            }
          ]
        },
        type: "program",
        isSingleThread: true,
        groups: [
          {
            id: "group-id-0004",
            name: "Everyone"
          }
        ],
        description: "HTZ coverage calculation",
        OS: ["windows"],
        calls: [
          {
            id: "call-id-0003",
            system: "windows",
            command:
              '"C:/ATDI/HTZ communications x64/HTZcx64.exe" {{project-file}} -ADMIN 1010'
          }
        ],
        inputs: [
          {
            id: "input-id-0007",
            name: "Project file",
            ident: "project-file",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              extensions: ["PROx"]
            }
          },
          {
            id: "input-id-0008",
            name: "Network file",
            ident: "ewf-file",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              extensions: ["EWFx"]
            }
          },
          {
            id: "input-id-0009",
            name: "Parameters file",
            ident: "prm-file",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              extensions: ["PRM"]
            }
          },
          {
            id: "input-id-0010",
            name: "DTM layer file",
            ident: "geo-file",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              extensions: ["GEO"]
            }
          },
          {
            id: "input-id-0011",
            name: "Clutter layer file",
            ident: "sol-file",
            isArray: false,
            isRequired: false,
            type: "file",
            descriptor: {
              extensions: ["SOL"]
            }
          },
          {
            id: "input-id-0012",
            name: "Building layer file",
            ident: "blg-file",
            isArray: false,
            isRequired: false,
            type: "file",
            descriptor: {
              extensions: ["BLG"]
            }
          }
        ],
        outputs: [
          {
            id: "output-id-0008",
            name: "EWFx file with coverage",
            ident: "ewf-file-out",
            isArray: false,
            isRequired: true,
            type: "file",
            descriptor: {
              type: "search",
              relativeDir: ".",
              namePattern: "*.EWFx"
            }
          }
        ],
        inputData: {},
        outputData: {}
      }
    }
  ],
  pipes: [
    {
      id: "pipe-id-0001",
      from: {
        stage: {
          id: "stage-id-0002",
          order: 1,
          job: {
            id: "job-id-0002",
            name: "Project generation",
            owner: {
              id: "user-id-0001",
              fullName: "System administrator",
              email: "admin@example.com",
              groups: [
                {
                  id: "group-id-0004",
                  name: "Everyone"
                },
                {
                  id: "group-id-0003",
                  name: "Administrators",
                  description: "System administrators"
                }
              ]
            },
            type: "script",
            isSingleThread: true,
            groups: [
              {
                id: "group-id-0004",
                name: "Everyone"
              }
            ],
            description: "HTZ coverage calculation",
            OS: ["windows"],
            calls: [
              {
                id: "call-id-0002",
                system: "windows",
                command:
                  "prm-gen.bat {{prm-file}} {{ewf-file}} {{geo-file}} {{sol-file}} {{blg-file}}"
              }
            ],
            inputs: [
              {
                id: "input-id-0001",
                name: "Network file",
                ident: "ewf-file",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  extensions: ["EWFx"]
                }
              },
              {
                id: "input-id-0002",
                name: "Parameters file",
                ident: "prm-file",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  extensions: ["PRM"]
                }
              },
              {
                id: "input-id-0003",
                name: "DTM layer file",
                ident: "geo-file",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  extensions: ["GEO"]
                }
              },
              {
                id: "input-id-0004",
                name: "Clutter layer file",
                ident: "sol-file",
                isArray: false,
                isRequired: false,
                type: "file",
                descriptor: {
                  extensions: ["SOL"]
                }
              },
              {
                id: "input-id-0005",
                name: "Building layer file",
                ident: "blg-file",
                isArray: false,
                isRequired: false,
                type: "file",
                descriptor: {
                  extensions: ["BLG"]
                }
              }
            ],
            outputs: [
              {
                id: "output-id-0002",
                name: "Generated PROx file",
                ident: "pro-file-out",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: "",
                  namePattern: "*.PRM"
                }
              },
              {
                id: "output-id-0003",
                name: "Forwarded PRM file",
                ident: "prm-file",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.PRM"
                }
              },
              {
                id: "output-id-0004",
                name: "Forwarded GEO file",
                ident: "geo-file-out",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.GEO"
                }
              },
              {
                id: "output-id-0005",
                name: "Forwarded SOL file",
                ident: "sol-file-out",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.SOL"
                }
              },
              {
                id: "output-id-0006",
                name: "Forwarded SOL file",
                ident: "blg-file-out",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.BLG"
                }
              },
              {
                id: "output-id-0007",
                name: "Forwarded EWFx file",
                ident: "ewf-file-out",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: "",
                  namePattern: "*.EWFx"
                }
              }
            ],
            inputData: {},
            outputData: {}
          }
        },
        output: {
          id: "output-id-0002",
          name: "Generated PROx file",
          ident: "pro-file-out",
          isArray: false,
          isRequired: true,
          type: "file",
          descriptor: {
            type: "search",
            relativeDir: "",
            namePattern: "*.PRM"
          }
        }
      },
      to: {
        stage: {
          id: "stage-id-0003",
          order: 2,
          job: {
            id: "job-id-0003",
            name: "Coverage calculation",
            owner: {
              id: "user-id-0001",
              fullName: "System administrator",
              email: "admin@example.com",
              groups: [
                {
                  id: "group-id-0004",
                  name: "Everyone"
                },
                {
                  id: "group-id-0003",
                  name: "Administrators",
                  description: "System administrators"
                }
              ]
            },
            type: "program",
            isSingleThread: true,
            groups: [
              {
                id: "group-id-0004",
                name: "Everyone"
              }
            ],
            description: "HTZ coverage calculation",
            OS: ["windows"],
            calls: [
              {
                id: "call-id-0003",
                system: "windows",
                command:
                  '"C:/ATDI/HTZ communications x64/HTZcx64.exe" {{project-file}} -ADMIN 1010'
              }
            ],
            inputs: [
              {
                id: "input-id-0007",
                name: "Project file",
                ident: "project-file",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  extensions: ["PROx"]
                }
              },
              {
                id: "input-id-0008",
                name: "Network file",
                ident: "ewf-file",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  extensions: ["EWFx"]
                }
              },
              {
                id: "input-id-0009",
                name: "Parameters file",
                ident: "prm-file",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  extensions: ["PRM"]
                }
              },
              {
                id: "input-id-0010",
                name: "DTM layer file",
                ident: "geo-file",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  extensions: ["GEO"]
                }
              },
              {
                id: "input-id-0011",
                name: "Clutter layer file",
                ident: "sol-file",
                isArray: false,
                isRequired: false,
                type: "file",
                descriptor: {
                  extensions: ["SOL"]
                }
              },
              {
                id: "input-id-0012",
                name: "Building layer file",
                ident: "blg-file",
                isArray: false,
                isRequired: false,
                type: "file",
                descriptor: {
                  extensions: ["BLG"]
                }
              }
            ],
            outputs: [
              {
                id: "output-id-0008",
                name: "EWFx file with coverage",
                ident: "ewf-file-out",
                isArray: false,
                isRequired: true,
                type: "file",
                descriptor: {
                  type: "search",
                  relativeDir: ".",
                  namePattern: "*.EWFx"
                }
              }
            ],
            inputData: {},
            outputData: {}
          }
        },
        input: {
          id: "input-id-0007",
          name: "Project file",
          ident: "project-file",
          isArray: false,
          isRequired: true,
          type: "file",
          descriptor: {
            extensions: ["PROx"]
          }
        }
      }
    }
  ],
  inputs: [],
  outputs: [],
  meta: {
    position: {
      //required
      // recipeIn: {
      //   x: 10,
      //   y: 300
      // },
      //required
      // recipeOut: {
      //   x: 600,
      //   y: 300
      // }
      //[stage-id]: {x: nymber, y: number}
    }
  }
};
*/
export const stageTest = {
  id: "stage-id-00023",
  order: 1,
  job: {
    id: "job-id-00023",
    name: "Project generation",
    owner: {
      id: "user-id-00013",
      fullName: "System administrator",
      email: "admin@example.com",
      groups: [
        {
          id: "group-id-0004",
          name: "Everyone"
        },
        {
          id: "group-id-0003",
          name: "Administrators",
          description: "System administrators"
        }
      ]
    },
    type: "script",
    isSingleThread: true,
    groups: [
      {
        id: "group-id-00043",
        name: "Everyone"
      }
    ],
    description: "HTZ coverage calculation",
    OS: ["windows"],
    calls: [
      {
        id: "call-id-00023",
        system: "windows",
        command:
          "prm-gen.bat {{prm-file}} {{ewf-file}} {{geo-file}} {{sol-file}} {{blg-file}}"
      }
    ],
    inputs: [
      {
        id: "input-id-00013",
        name: "Network number",
        ident: "ewf-file",
        isArray: false,
        isRequired: true,
        type: "number",
        descriptor: {
          extensions: ["EWFx"]
        }
      },
      {
        id: "input-id-00023",
        name: "Parameters file",
        ident: "prm-file",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          extensions: ["PRM"]
        }
      },
      {
        id: "input-id-00033",
        name: "DTM layer file",
        ident: "geo-file",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          extensions: ["GEO"]
        }
      },
      {
        id: "input-id-00043",
        name: "Clutter layer file",
        ident: "sol-file",
        isArray: false,
        isRequired: false,
        type: "file",
        descriptor: {
          extensions: ["SOL"]
        }
      },
      {
        id: "input-id-00053",
        name: "Building layer file",
        ident: "blg-file",
        isArray: false,
        isRequired: false,
        type: "file",
        descriptor: {
          extensions: ["BLG"]
        }
      }
    ],
    outputs: [
      {
        id: "output-id-00023",
        name: "Generated PROx file",
        ident: "pro-file-out",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: "",
          namePattern: "*.PRM"
        }
      },
      {
        id: "output-id-00034",
        name: "Forwarded PRM file",
        ident: "prm-file",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: ".",
          namePattern: "*.PRM"
        }
      },
      {
        id: "output-id-00043",
        name: "Forwarded GEO file",
        ident: "geo-file-out",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: ".",
          namePattern: "*.GEO"
        }
      },
      {
        id: "output-id-00054",
        name: "Forwarded SOL file",
        ident: "sol-file-out",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: ".",
          namePattern: "*.SOL"
        }
      },
      {
        id: "output-id-00063",
        name: "Forwarded SOL file",
        ident: "blg-file-out",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: ".",
          namePattern: "*.BLG"
        }
      },
      {
        id: "output-id-000753",
        name: "Forwarded number",
        ident: "ewf-file-out",
        isArray: false,
        isRequired: true,
        type: "number",
        descriptor: {
          type: "search",
          relativeDir: "",
          namePattern: "*.EWFx"
        }
      }
    ],
    inputData: {},
    outputData: {}
  }
};

export const addFakeNode = (onRemove: (id: string) => void) => {
  const id = Date.now().toString();
  return {
    id: id,
    type: NodeType.nodeCustom,
    position: { x: 50, y: 50 },
    data: {
      onRemove,
      isCreateNode: true,
      name: stageTest.job.name + " " + id,
      inputs: stageTest.job.inputs.map((item) => ({
        id: item.id,
        label: item.name,
        typePort: "input",
        type: item.type,
        node_id: id
      })),
      outputs: stageTest.job.outputs.map((item) => ({
        id: item.id,
        label: item.name,
        typePort: "output",
        type: item.type,
        node_id: id
      }))
    }
  };
};
