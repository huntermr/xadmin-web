const roleresourcemapping = require("./roleresourcemapping")
// @ponicode
describe("roleresourcemapping.getRoleResourceMappingList", () => {
    test("0", () => {
        let callFunction = () => {
            roleresourcemapping.getRoleResourceMappingList(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            roleresourcemapping.getRoleResourceMappingList(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            roleresourcemapping.getRoleResourceMappingList(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("roleresourcemapping.getRoleResourceMappingInfo", () => {
    test("0", () => {
        let callFunction = () => {
            roleresourcemapping.getRoleResourceMappingInfo("proj_")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            roleresourcemapping.getRoleResourceMappingInfo("fake_project")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            roleresourcemapping.getRoleResourceMappingInfo(-1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            roleresourcemapping.getRoleResourceMappingInfo("YOUR_PROJECT_ID")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            roleresourcemapping.getRoleResourceMappingInfo(-10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            roleresourcemapping.getRoleResourceMappingInfo(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("roleresourcemapping.addRoleResourceMapping", () => {
    test("0", () => {
        let callFunction = () => {
            roleresourcemapping.addRoleResourceMapping(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            roleresourcemapping.addRoleResourceMapping(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            roleresourcemapping.addRoleResourceMapping(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("roleresourcemapping.editRoleResourceMapping", () => {
    test("0", () => {
        let callFunction = () => {
            roleresourcemapping.editRoleResourceMapping("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            roleresourcemapping.editRoleResourceMapping("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            roleresourcemapping.editRoleResourceMapping("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            roleresourcemapping.editRoleResourceMapping("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            roleresourcemapping.editRoleResourceMapping(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            roleresourcemapping.editRoleResourceMapping(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("roleresourcemapping.delRoleResourceMapping", () => {
    test("0", () => {
        let callFunction = () => {
            roleresourcemapping.delRoleResourceMapping("fake_project_id")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            roleresourcemapping.delRoleResourceMapping("YOUR_PROJECT_ID")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            roleresourcemapping.delRoleResourceMapping(0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            roleresourcemapping.delRoleResourceMapping(10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            roleresourcemapping.delRoleResourceMapping("fake_project")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            roleresourcemapping.delRoleResourceMapping(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})
