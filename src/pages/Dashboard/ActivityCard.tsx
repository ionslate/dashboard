import { Audit } from '../../__generated__';
import { Disclosure } from '@headlessui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { classes } from '../../utils';
import { memo } from 'react';
import ActivityFields from './ActivityFields';

interface ActivityCardProps {
  activity: Audit;
}

export default memo(function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="p-2 pb-1">
      <div className="p-2 rounded-sm bg-gray-700">
        <div className="flex justify-between items-center mb-3">
          <span className="uppercase font-bold text-purple-300">
            {activity.resource}
          </span>
          <span className="text-gray-400 text-sm">{activity.performedAt}</span>
        </div>
        <div>
          <span className="font-bold text-gray-200">
            {activity.performedBy}
          </span>
          <span className="text-gray-300"> {activity.action} </span>
          <span className="font-bold text-gray-200">
            {activity.resourceName}
          </span>
          {activity.parentResourceName ? (
            <>
              <span className="text-gray-300"> for </span>
              <span className="font-bold text-gray-200">
                {activity.parentResourceName}
              </span>
            </>
          ) : null}
        </div>
        {activity.auditFields?.length && (
          <div className="mt-2 text-sm">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full flex flex-start items-center py-1 focus:outline-none focus:bg-gray-600 rounded-sm">
                    <span
                      className={classes(
                        !open && 'transform rotate-180',
                        'mr-2',
                      )}
                    >
                      <MdArrowDropDown className="text-lg" />
                    </span>
                    <span>View Details</span>
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <ActivityFields
                      fields={activity.auditFields}
                      action={activity.action}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        )}
      </div>
    </div>
  );
});
