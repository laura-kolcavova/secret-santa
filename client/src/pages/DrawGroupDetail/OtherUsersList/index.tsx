import { Component, For } from 'solid-js';
import { DrawGroupNonParticipantDetailDto } from '~/api/drawGroups/dto/DrawGroupDetailDto';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';

export type OtherUsersListProps = {
  users: DrawGroupNonParticipantDetailDto[];
};

export const OtherUsersList: Component<OtherUsersListProps> = (props) => {
  const sortedUsers = [...props.users].sort((a, b) => {
    return a.fullName.localeCompare(b.fullName);
  });

  return (
    <div class="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 class="text-xl font-bold text-pallete-6 mb-4">
        <FormattedMessage message={messages.otherUsers} />
      </h2>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                <FormattedMessage message={messages.name} />
              </th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                <FormattedMessage message={messages.email} />
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={sortedUsers}>
              {(user) => (
                <tr class="border-b border-gray-100 hover:bg-gray-50">
                  <td class="py-3 px-4 text-pallete-6">{user.fullName}</td>
                  <td class="py-3 px-4 text-gray-600">{user.email}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};
