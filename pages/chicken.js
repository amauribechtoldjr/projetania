import { useEffect, useState } from "react";

import withApollo from "@/hoc/withApollo";

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import BaseLayout from '@/layouts/BaseLayout';

const Chicken = () => {
  const [chickendDateStart, setChickendDateStart] = useState(null);
  const [chickendDateEnd, setChickendDateEnd] = useState(null);

  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    register({ name: "chickenDateStart" });
    register({ name: "chickenDateEnd" });
  }, [register]);

  const handleChangeDate = (dateType, setDate) => (date) => {
    setValue(
      dateType,
      (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date
    );
    setDate(date);
  };

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Cozinha...</h1>
            <form
              onSubmit={handleSubmit((chickenData) => {
                alert(JSON.stringify(chickenData));
              })}
            >
              <div className="form-group">
                <label htmlFor="chickenDate">
                  Datetime picker exemplo com useForm hook! (◕‿◕) INÍCIO
                </label>
                <div>
                  <DatePicker
                    showYearDropdown
                    selected={chickendDateStart}
                    onChange={handleChangeDate(
                      "chickenDateStart",
                      setChickendDateStart
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="chickenDate">
                  Datetime picker exemplo com useForm hook! (◕‿◕) FINAL
                </label>
                <div>
                  <DatePicker
                    disabled={!chickendDateEnd}
                    showYearDropdown
                    selected={chickendDateEnd}
                    onChange={handleChangeDate(
                      "chickenDateEnd",
                      setChickendDateEnd
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                {chickendDateEnd && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      handleChangeDate(
                        "chickenDateEnd",
                        setChickendDateEnd
                      )(null)
                    }
                  >
                    No End date
                  </button>
                )}
                {!chickendDateEnd && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() =>
                      handleChangeDate(
                        "chickenDateEnd",
                        setChickendDateEnd
                      )(new Date())
                    }
                  >
                    Set end date
                  </button>
                )}
              </div>
              <button type="subtmi">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Chicken);
