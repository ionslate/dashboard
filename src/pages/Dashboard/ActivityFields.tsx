import { AuditField } from '../../__generated__';

interface ActivityFieldsProps {
  fields?: AuditField[] | null;
  action: string;
}

export default function ActivityFields({
  fields,
  action,
}: ActivityFieldsProps) {
  if (!fields?.length) {
    return null;
  }

  if (action === 'updated')
    return (
      <ul className="list-disc list-outside ml-3 p-1">
        {fields.map((field) => (
          <li className="m-2" key={field.fieldName}>
            <span className="text-gray-300">updated </span>
            <span className="font-bold text-gray-200">{field.fieldName}</span>
            <span className="text-gray-300"> to </span>
            <span className="font-bold text-gray-200">
              {field.newValue || '(Nothing)'}
            </span>
            <span className="text-gray-300"> from </span>
            <span className="font-bold text-gray-200">
              {field.oldValue || '(Nothing)'}
            </span>
          </li>
        ))}
      </ul>
    );

  if (action === 'created') {
    return (
      <ul className="list-disc list-outside ml-3 p-1">
        {fields.map((field) => (
          <li className="m-2" key={field.fieldName}>
            <span className=" text-gray-200">{field.fieldName}: </span>
            <span className="font-bold text-gray-200">
              {field.newValue || '(Nothing)'}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}
