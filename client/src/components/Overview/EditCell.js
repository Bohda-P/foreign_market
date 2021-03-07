import {Cell} from 'rsuite-table'

export const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props}>
        <a
          onClick={() => {
            onClick && onClick(rowData.date);
          }}
        >
          {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
        </a>
      </Cell>
    );
};

export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
    return (
      <Cell {...props}>
        {rowData.status === 'EDIT' ? (
          <input
            className="input"
            defaultValue={rowData[dataKey]}
            onChange={event => {
              onChange && onChange(rowData.date, dataKey, event.target.value);
            }}
          />
        ) : (
          rowData[dataKey]
        )}
      </Cell>
    );
  };
   