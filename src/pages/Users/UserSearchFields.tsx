import { DebouncedFunc } from 'lodash';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Button from '../../components/Button';
import Select, { SelectOption } from '../../components/Select';
import TextField from '../../components/TextField';
import Tooltip from '../../components/Tooltip';
import { UserRole, UserSearch } from '../../__generated__';

type SearchDropdownOptions = 'ALL' | 'USERNAME' | 'EMAIL';

const searchOptions: SelectOption<SearchDropdownOptions>[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Username', value: 'USERNAME' },
  { label: 'Email', value: 'EMAIL' },
];

const filterByRoleOptions: SelectOption<UserRole | null>[] = [
  { label: '(None)', value: null },
  { label: 'User', value: 'USER' },
  { label: 'User Admin', value: 'USER_ADMIN' },
  { label: 'Content Manager', value: 'CONTENT_MANAGER' },
  { label: 'Content Publisher', value: 'CONTENT_PUBLISHER' },
];

const filterByStatus: SelectOption<boolean | null>[] = [
  { label: 'All', value: null },
  { label: 'Enabled', value: true },
  { label: 'Disabled', value: false },
];

const initialSearchOptions = {
  searchInput: '',
  selectedSearchOption: searchOptions[0],
  selectedRoleFilter: filterByRoleOptions[0],
  selectedStatusFilter: filterByStatus[0],
};

interface UserSearchFieldsProps {
  onSearch: DebouncedFunc<(userSearch: UserSearch) => void>;
}

export default function UserSearchFields({ onSearch }: UserSearchFieldsProps) {
  const [searchFields, setSearchFields] = useState(initialSearchOptions);

  const handleClearSearch = useCallback(() => {
    setSearchFields(initialSearchOptions);
    onSearch({});
    onSearch.flush();
  }, [onSearch]);

  useEffect(() => {
    return handleClearSearch;
  }, [handleClearSearch]);

  function handleSearchFieldChange(
    updatedFields: typeof initialSearchOptions,
    { flush } = { flush: false },
  ) {
    setSearchFields(updatedFields);
    onSearch({
      searchTerm:
        updatedFields.selectedSearchOption.value === 'ALL'
          ? updatedFields.searchInput
          : null,
      email:
        updatedFields.selectedSearchOption.value === 'EMAIL'
          ? updatedFields.searchInput
          : null,
      username:
        updatedFields.selectedSearchOption.value === 'USERNAME'
          ? updatedFields.searchInput
          : null,
      role: updatedFields.selectedRoleFilter.value,
      active: updatedFields.selectedStatusFilter.value,
    });

    if (flush) {
      onSearch.flush();
    }
  }

  return (
    <div className="flex justify-between items-end">
      <div className="flex items-end">
        <TextField
          className="w-64"
          label="search"
          id="user-search"
          placeholder="Search..."
          value={searchFields.searchInput}
          onChange={(e) =>
            handleSearchFieldChange({
              ...searchFields,
              searchInput: e.target.value,
            })
          }
          straightSide="right"
        />
        <Select
          straightSide="left"
          value={searchFields.selectedSearchOption}
          onChange={({ option }) =>
            handleSearchFieldChange(
              {
                ...searchFields,
                selectedSearchOption: option,
              },
              { flush: true },
            )
          }
          options={searchOptions}
          className="w-36 mr-6"
        />
        <Select
          label="filter by role"
          value={searchFields.selectedRoleFilter}
          onChange={({ option }) =>
            handleSearchFieldChange(
              {
                ...searchFields,
                selectedRoleFilter: option,
              },
              { flush: true },
            )
          }
          options={filterByRoleOptions}
          className="w-48 mr-6"
        />
        <Select
          label="filter by status"
          value={searchFields.selectedStatusFilter}
          options={filterByStatus}
          onChange={({ option }) =>
            handleSearchFieldChange(
              {
                ...searchFields,
                selectedStatusFilter: option,
              },
              { flush: true },
            )
          }
          className="w-48 mr-6"
        />
      </div>
      <div className="flex items-end">
        {(searchFields.searchInput ||
          searchFields.selectedSearchOption.value !== 'ALL' ||
          searchFields.selectedRoleFilter.value !== null ||
          searchFields.selectedStatusFilter.value !== null) && (
          <Tooltip tip="Clear search">
            <Button
              icon={FiX}
              color="red"
              variant="outline"
              size="sm"
              className="mb-2"
              onClick={handleClearSearch}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
}
