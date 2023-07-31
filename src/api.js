import axios from "axios";

const getDistricts = async () => {
    await axios
      .get("http://127.0.0.1:3333/districts")
      .then((res) => res.data)
      .then((data) => {
        setDistricts(data);
      })
      .catch((err) => {});
  };
  const getLocalBodyTypes = async () => {
    await axios
      .get("http://127.0.0.1:3333/local_body_type")
      .then((res) => res.data)
      .then((data) => {
        setLocalBodyTypes(data);
      })
      .catch((err) => {});
  };
  const getLocalBodyName = async (district, localBodyType) => {
    if (district && localBodyType) {
      await axios
        .get(
          `http://127.0.0.1:3333/local_body_name/${district.id}/${localBodyType.id}`
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
      await axios
        .get(`http://127.0.0.1:3333/zones/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setZones(data);
        })
        .catch((err) => {});
    }
  };
  const getWard = async (id) => {
    if (id) {
      await axios
        .get(`http://127.0.0.1:3333/wards/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setWards(data);
        })
        .catch((err) => {});
    }
  };