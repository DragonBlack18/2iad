import { useState } from 'react';

export default function EditableCell({ value, type, onChange, readOnly }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');

  const handleDoubleClick = () => {
    if (!readOnly) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  const renderValue = () => {
    if (type === 'BOOLEAN') {
      return (
        <input
          type="checkbox"
          checked={value === 'true' || value === true}
          onChange={(e) => onChange(e.target.checked.toString())}
          disabled={readOnly}
          className="h-4 w-4"
        />
      );
    }

    if (type === 'DATE' && value) {
      return new Date(value).toLocaleDateString('pt-BR');
    }

    if (type === 'NUMBER' && value) {
      return parseFloat(value).toLocaleString('pt-BR');
    }

    return value || '';
  };

  if (isEditing) {
    return (
      <input
        type={type === 'NUMBER' ? 'number' : type === 'DATE' ? 'date' : 'text'}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className="w-full h-full px-2 py-1 border-2 border-blue-500 focus:outline-none"
      />
    );
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`w-full h-full px-2 py-1 flex items-center ${
        readOnly ? 'bg-gray-50 cursor-not-allowed' : 'cursor-cell hover:bg-blue-50'
      }`}
      title={readOnly ? 'Somente leitura' : 'Clique 2x para editar'}
    >
      {renderValue()}
    </div>
  );
}
