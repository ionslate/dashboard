import { DebouncedFunc } from 'lodash';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Button from '../../components/Button';
import Select, { SelectOption } from '../../components/Select';
import TextField from '../../components/TextField';
import { UserRole, UserSearch } from '../../__generated__';

type SearchDropdownOptions = 'ALL' | 'USERNAME' | 'EMAIL';

const searchOptions: SelectOption<SearchDropdownOptions>[] = [
  { label: 'All', disabled: false, value: 'ALL' },
  { label: 'Username', disabled: false, value: 'USERNAME' },
  { label: 'Email', disabled: false, value: 'EMAIL' },
];

const filterByRoleOptions: SelectOption<UserRole | null>[] = [
  { label: '(None)', disabled: false, value: null },
  { label: 'User', disabled: false, value: 'USER' },
  { label: 'User Admin', disabled: false, value: 'USER_ADMIN' },
  { label: 'Content Manager', disabled: false, value: 'CONTENT_MANAGER' },
  { label: 'Content Publisher', disabled: false, value: 'CONTENT_PUBLISHER' },
];

const initialSearchOptions = {
  searchInput: '',
  selectedSearchOption: searchOptions[0],
  selectedRoleFilter: filterByRoleOptions[0],
};

interface UserSearchFieldsProps {
  onSearch: DebouncedFunc<(userSearch: UserSearch) => void>;
}

export function UserSearchFields({ onSearch }: UserSearchFieldsProps) {
  const [searchFields, setSearchFields] = useState(initialSearchOptions);

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
    });

    if (flush) {
      onSearch.flush();
    }
  }

  function handleClearSearch() {
    setSearchFields(initialSearchOptions);
    onSearch({});
    onSearch.flush();
  }

  return (
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
        className="w-36 mr-5"
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
        className="w-48 mr-5"
      />
      {(searchFields.searchInput ||
        searchFields.selectedSearchOption.value !== 'ALL' ||
        searchFields.selectedRoleFilter.value !== null) && (
        <Button
          icon={FiX}
          color="red"
          size="sm"
          variant="outline"
          className="mb-2"
          onClick={handleClearSearch}
        />
      )}
    </div>
  );
}
