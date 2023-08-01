import "./App.css";
import Accordion from "./components/Accordion";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectBox } from "./components/SelectBox";
import React, { useEffect } from "react";
import Link from "./components/Link";
import { insertDataToServer } from "./redux/actions";
import { TextInput } from "./components/TextInput";
import { FormDatePicker } from "./components/DataPicker";
import { CheckBox } from "./components/CheckBox";
import Column from "./components/Column";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Row,
  Breadcrumb,
  Col,
  Button,
} from "react-bootstrap";
import moment from "moment";
import { useSelector } from "react-redux";
import axiosInstance from "./utils/axios";

function App() {
  const [districts, setDistricts] = React.useState([]);
  const [isLocalBodyDetailsFilled, setIsLocalBodyDetailsFilled] =
    React.useState(false);
  const [isPermitDetailsFilled, setIsPermitDetailsFilled] =
    React.useState(false);
  const [isSurveyDetailsCompleted, setIsSurveyDetailsCompleted] =
    React.useState(false);
  const [localBodyTypes, setLocalBodyTypes] = React.useState([]);
  const [localBodyNames, setLocalBodyNames] = React.useState([]);
  const [occupancyNatures, setOccupancyNatures] = React.useState([]);
  const [zones, setZones] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [villages, setVillages] = React.useState([]);

  const localBodyFormTwo = useSelector((state) => state.localBodyFormTwo);

  useEffect(() => {
    if (
      localBodyFormTwo.isComepleted &&
      localBodyFormTwo.hasError &&
      !localBodyFormTwo.isLoading
    ) {
 
      alert(localBodyFormTwo.message);
    } else if (
      localBodyFormTwo.isComepleted &&
      !localBodyFormTwo.hasError &&
      !localBodyFormTwo.isLoading
    ) {
      alert(localBodyFormTwo.message);
    }
  }, [localBodyFormTwo]);

  /* The above code is using the `useEffect` hook in React to perform some actions when the component is
 mounted. It is calling three functions: `getDistricts()`, `getLocalBodyTypes()`, and
 `getOccupancyNature()`. These functions are likely responsible for fetching data from an API or
 performing some other asynchronous operation. The `[]` as the second argument to `useEffect`
 ensures that these functions are only called once, when the component is initially mounted. */
  React.useEffect(() => {
    getDistricts();
    getLocalBodyTypes();
    getOccupancyNature();
  }, []);

  /* The above code is defining a JavaScript object called `defaultValues`. This object contains various
properties with default values assigned to them. These properties include `district`,
`localBodyType`, `localBodyName`, `zonalOffice`, `wardNo`, `permitNumber`, `permitDate`,
`prevPermitLink`, `occupancyNo`, `occupancyDate`, `isPartiallyCompleted`, `occupancyNature`, and
`surveyInfo`. These are the default values for use Formm hook */
  const defaultValues = {
    district: null,
    localBodyType: null,
    localBodyName: null,
    zonalOffice: null,
    wardNo: null,
    permitNumber: "",
    permitDate: null,
    prevPermitLink: "",
    occupancyNo: "",
    occupancyDate: null,
    isPartiallyCompleted: false,
    occupancyNature: {},
    surveyInfo: [
      {
        villageName: {},
        surveyNumber: "",
        reSurveyNumber: "",
      },
    ],
  };

  /** Validtion schema for yup */
  const validationSchema = Yup.object().shape({
    district: Yup.object().required("District name is required"),
    localBodyType: Yup.object().required("Local body type is required"),
    localBodyName: Yup.object().required("Local body name is required"),
    zonalOffice: Yup.object().required("Zonal office is required"),
    wardNo: Yup.object().required("Ward number is required"),
    permitNumber: Yup.number()
      .typeError("Value must be a number")
      .min(10, "Value must be at least 10")
      .required("Value is required"),
    permitDate: Yup.date().required(),
    prevPermitLink: Yup.string().required(),
    occupancyNo: Yup.number()
      .typeError("Value must be a number")
      .min(10, "Value must be at least 10")
      .required("Value is required"),
    occupancyDate: Yup.date().required(),
    isPartiallyCompleted: Yup.boolean().required(),
    occupancyNature: Yup.object().required("Occupancy Nature is required"),
    surveyInfo: Yup.array()
      .of(
        Yup.object().shape({
          villageName: Yup.object().required("Village Name is required"),
          surveyNumber: Yup.string().required("Survey Number is required"),
          reSurveyNumber: Yup.string().required("Re-Survey Number is required"),
        })
      )
      .required("Array of Objects is required"),
  });

  /** methods for useForm hook*/
  const methods = useForm({
    defaultValues: defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const {
    watch,
    reset,
    setError,
    setValue,
    getValues,
    handleSubmit,
    register,
    control,
    formState: {
      errors,
      isSubmitting,
      isLoading,
      isSubmitted,
      isSubmitSuccessful,
      isValid,
    },
  } = methods;
  /** Observing form objects to make requiest */
  const district = watch("district");
  const localBodyType = watch("localBodyType");
  const localBodyName = watch("localBodyName");
  const zonalOffice = watch("zonalOffice");
  const values = watch();

  /* React useEffect hook that is triggered whenever the values of "district" and
"localBodyType" change. Inside the useEffect, it resets the values of "localBodyName", "wardNo", and
"zonalOffice" to null using the setValue function. It also sets the value of
"isLocalBodyDetailsFilled" to false. Finally, it calls the "getLocalBodyName" function with the
updated values of "district" and "localBodyType". */
  React.useEffect(() => {
    if (district && localBodyType) {
      setValue("localBodyName", null);
      setValue("wardNo", null);
      setValue("zonalOffice", null);
      setIsLocalBodyDetailsFilled(false);
      getLocalBodyName(district, localBodyType);
    }
  }, [district, localBodyType]);
  /*  React useEffect hook that is triggered whenever the value of `localBodyName`
 changes. Inside the useEffect, it performs the following actions: */
  React.useEffect(() => {
    if (localBodyName) {
      setValue("surveyInfo", [
        {
          villageName: {},
          surveyNumber: "",
          reSurveyNumber: "",
        },
      ]);
      setValue("wardNo", null);
      setValue("zonalOffice", null);
      setIsLocalBodyDetailsFilled(false);
      getZone(localBodyName.id);
      setVillages([]);
      getVillages(localBodyName.id);
    }
  }, [localBodyName]);
  /* React useEffect hook that is triggered whenever the value of `zonalOffice`
  changes. Inside the useEffect, it checks if `localBodyName` is truthy. If it is, it sets the value
  of "wardNo" to null, sets `isLocalBodyDetailsFilled` to false, and calls the `getZone` function
  with the `id` property of `localBodyName`. */
  React.useEffect(() => {
    if (localBodyName) {
      setValue("wardNo", null);
      setIsLocalBodyDetailsFilled(false);
      getZone(localBodyName.id);
    }
  }, [zonalOffice]);

  /*  React useEffect hook that is triggered whenever the value of the `zonalOffice`
 variable changes. */
  React.useEffect(() => {
    if (zonalOffice) {
      setIsLocalBodyDetailsFilled(false);
      getWard(zonalOffice.id);
    }
  }, [zonalOffice]);

  // If form is valid then to pass data to server using redux action
  const onSubmit = (data) => {
    onLocalBoadyAccordianClosedHandler();
    onPermitAndOccupancyAccordianClosedHandler();
    onSurveyDetailsCompleted();
    insertDataToServer(data);
  };
  // To clear the data while unmount
  React.useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const getDistricts = async () => {
    await axiosInstance
      .get("/districts")
      .then((res) => res.data)
      .then((data) => {
        setDistricts(data);
      })
      .catch((err) => {});
  };
  const getLocalBodyTypes = async () => {
    await axiosInstance
      .get("/local_body_type")
      .then((res) => res.data)
      .then((data) => {
        setLocalBodyTypes(data);
      })
      .catch((err) => {});
  };
  const getLocalBodyName = async (district, localBodyType) => {
    if (district && localBodyType) {
      await axiosInstance
        .get(
          `/local_body_name/${district.id}/${localBodyType.id}`
        )
        .then((res) => res.data)
        .then((data) => {
          setLocalBodyNames(data);
        })
        .catch((err) => {});
    }
  };
  const getZone = async (id) => {
    if (id) {
      await axiosInstance
        .get(`/zones/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setZones(data);
        })
        .catch((err) => {});
    }
  };
  const getWard = async (id) => {
    if (id) {
      await axiosInstance
        .get(`/wards/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setWards(data);
        })
        .catch((err) => {});
    }
  };
  const getVillages = async (id) => {
    if (id) {
      await axiosInstance
        .get(`/villages/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setVillages(data);
        })
        .catch((err) => {});
    }
  };
  const getOccupancyNature = async () => {
    await axiosInstance
      .get(`/occupancy-nature`)
      .then((res) => res.data)
      .then((data) => {
        setOccupancyNatures(data);
      })
      .catch((err) => {});
  };
  /** To check whether local body card is completed or not  */
  const onLocalBoadyAccordianClosedHandler = () => {
    const values = getValues();
    setIsLocalBodyDetailsFilled(
      values.district &&
        values.localBodyName &&
        values.localBodyType &&
        values.wardNo &&
        values.zonalOffice
    );
  };
  /** To check whether permit and occupancy card is completed or not  */
  const onPermitAndOccupancyAccordianClosedHandler = () => {
    const values = getValues();
    setIsPermitDetailsFilled(
      values.occupancyNo &&
        values.occupancyNature &&
        values.occupancyDate &&
        values.permitNumber &&
        values.permitDate &&
        values.prevPermitLink
    );
  };
  /** To check whether survey details card is completed or not  */
  const onSurveyDetailsCompleted = () => {
    const values = getValues();
    setIsSurveyDetailsCompleted(
      values.surveyInfo.filter(
        (data) => data.reSurveyNumber && data.reSurveyNumber && data.villageName
      ).length > 0
    );
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "surveyInfo",
  });



  return (
    <Container fluid>
      <Navbar expand="lg" className="bg-body-tertiary ms-auto">
        <Container fluid>
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Search</Nav.Link>
              <Nav.Link href="#link">Notification</Nav.Link>
              <NavDropdown title="Vijeesh Kumar" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row >
        <Breadcrumb className="bread">
          <Breadcrumb.Item href="#">Tax</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Tax Property</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Form 2</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row className="body-row">
        <Col md={2}>
          <Accordion title={"Application"} onClosed={() => {}}>
            <Column>
              <Link
                title={"Local Body Details"}
                isCompleted={isLocalBodyDetailsFilled}
              />
              <Link
                title={"Permit & Occupancy Details"}
                isCompleted={isPermitDetailsFilled}
              />
              <Link
                title={"Survey Details"}
                isCompleted={isSurveyDetailsCompleted}
              />
            </Column>
          </Accordion>
        </Col>
        <Col>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Accordion
                title={"Local Body Details"}
                onClosed={() => onLocalBoadyAccordianClosedHandler()}
              >
                <Row>
                  <Col>
                    <SelectBox
                      name={"district"}
                      options={districts}
                      label={"District"}
                    />
                  </Col>

                  <Col>
                    <SelectBox
                      name={"localBodyType"}
                      options={localBodyTypes}
                      label={"Local Body Type"}
                    />
                  </Col>

                  <Col>
                    <SelectBox
                      name={"localBodyName"}
                      options={localBodyNames}
                      label={"Local Body Name"}
                    />
                  </Col>

                  <Col>
                    <SelectBox
                      name={"zonalOffice"}
                      options={zones}
                      label={"Zonal Office"}
                    />
                  </Col>

                  <Col>
                    <SelectBox name={"wardNo"} options={wards} label={"Ward"} />
                  </Col>
                </Row>
              </Accordion>
              <Accordion
                title={"Permit & Occupancy Details"}
                onClosed={() => onPermitAndOccupancyAccordianClosedHandler()}
              >
                <Row>
                  <Col>
                    <TextInput
                      name={"permitNumber"}
                      label={"Permit Number"}
                      placeholder={"XXXXXXXXXXXXX"}
                    />
                  </Col>
                  <Col>
                    <FormDatePicker
                      name={"permitDate"}
                      label={"Permit Date"}
                      placeholder={"DD-MM-YYYY"}
                    />
                  </Col>
                  <Col>
                    <TextInput
                      name={"prevPermitLink"}
                      label={"Link with previous permit"}
                      placeholder={"Link with previous permit"}
                    />
                  </Col>
                  <Col>
                    <TextInput
                      name={"occupancyNo"}
                      label={"Occupancy Number"}
                      placeholder={"XXXXXXXXXXXXX"}
                    />
                  </Col>
                  <Col>
                    <FormDatePicker
                      name={"occupancyDate"}
                      label={"Occupancy Date"}
                      placeholder={"DD-MM-YYYY"}
                    />
                  </Col>
                  <Col>
                    <CheckBox
                      name={"isPartiallyCompleted"}
                      label={"Whether it is partially completed"}
                    />
                  </Col>
                  <Col>
                    <SelectBox
                      name={"occupancyNature"}
                      options={occupancyNatures}
                      label={"Occupancy Nature"}
                    />
                  </Col>
                </Row>
              </Accordion>
              <Accordion
                title={"Local Body Details"}
                onClosed={() => onSurveyDetailsCompleted()}
              >
                {fields.map((villageForm, index) => {
                  return (
                    <Row key={index}>
                      <Col>
                        <SelectBox
                          {...register(`surveyInfo.${index}.villageName`)}
                          name={"villageName"}
                          options={villages}
                          label={"Village Name"}
                        />
                      </Col>
                      <Col>
                        <TextInput
                          name={`surveyInfo.${index}.surveyNumber`}
                          label={"Survey Number"}
                          placeholder={"XXXXXXXXXXXXX"}
                        />
                      </Col>
                      <Col>
                        <TextInput
                          name={`surveyInfo.${index}.reSurveyNumber`}
                          label={"ReSurvey Number"}
                          placeholder={"XXXXXXXXXXXXX"}
                        />
                      </Col>
                      <Col>
                        <Button
                          disabled={fields.length === 1}
                          onClick={() => remove(index)}
                        >
                          X
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
                <Row>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                    <Button
                      onClick={() => {
                        append({
                          villageName: {},
                          surveyNumber: "",
                          reSurveyNumber: "",
                        });
                      }}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Accordion>
              <Row>
                <Col md={10}></Col>
                <Col md={2}>
                  <Row>
                    <Col>
                      <Button type="submit">Submit</Button>
                    </Col>
                    <Col>
                      <Button onClick={() => reset()}>Clear</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </form>
          </FormProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
