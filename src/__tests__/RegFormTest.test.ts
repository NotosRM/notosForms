import { JSONSchema4 } from "json-schema";
import { JSONSchemaModelMaker } from "../components/JsonSchema/JSONSchemaModelMaker";

test("test RegistrationForm", () => {
    let schema: JSONSchema4 = {
        "title": "A registration form",
        "description": "description",
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string",
                "title": "First name",
                "minLength": 3,
                "maxLength": 25
            },
            "lastName": {
                "type": "string",
                "title": "Last name ",
                "minLength": 3,
                "maxLength": 25
            },
            "Age": {
                "type": "number",
                "title": "Age"
            },
            "phoneNumber": {
                "type": "string",
                "controlOptions": {
                    "options": {
                        "placeholder": "enter u phone number"
                    }
                },
                "title": "phoneNumber",
                "minLength": 11,
                "maxLength": 11
            },
            "Group": {
                "type": "object",
                "title": "GroupName",
                "properties": {
                    "gender": {
                        "type": "string",
                        "title": "Gender",
                        "enum": [
                            "",
                            "male",
                            "female"
                        ]
                    }
                }
            }
        }
    }
    let model = {
        "title": "A registration form",
        "description": "description",
        "components": [
            {
                "type": 0,
                "key": "firstName",
                "code": "firstName",
                "label": "First name"
            },
            {
                "type": 0,
                "key": "lastName",
                "code": "lastName",
                "label": "Last name "
            },
            {
                "type": 0,
                "key": "Age",
                "code": "Age",
                "label": "Age",
                "fieldProps": {
                    "name": "Age",
                    "type": "number"
                }
            },
            {
                "type": 0,
                "key": "phoneNumber",
                "code": "phoneNumber",
                "label": "phoneNumber",
                "options": {
                    "placeholder": "enter u phone number"
                }
            },
            {
                "type": 1,
                "key": "Group",
                "code": "Group",
                "label": "GroupName",
                "components": [
                    {
                        "type": 0,
                        "key": "Group.gender",
                        "code": "Group.gender",
                        "label": "Gender",
                        "elements": [
                            "",
                            "male",
                            "female"
                        ],
                        "control": "select"
                    }
                ]
            }
        ]
    }
    let expectModel = JSONSchemaModelMaker.makeModel(schema)
    let { onSubmit, ...rest } = expectModel;
    expect(rest).toStrictEqual(model);
})