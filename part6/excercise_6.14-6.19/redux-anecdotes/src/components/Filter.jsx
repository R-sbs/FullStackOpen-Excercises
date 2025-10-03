import { useDispatch, useSelector } from "react-redux";
import { clearFilter, setFilterText } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filterText = useSelector((state) => state.filter);

  const handleChange = (event) => {
    dispatch(setFilterText(event.target.value));
  };

  const handleReset = () => {
    dispatch(clearFilter());
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filterText} />
      <input type="reset" onClick={handleReset} />
    </div>
  );
};

export default Filter;
