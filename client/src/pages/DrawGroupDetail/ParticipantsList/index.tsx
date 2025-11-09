import { Component, For } from 'solid-js';
import { DrawGroupParticipantDetailDto } from '~/api/drawGroups/dto/DrawGroupDetailDto';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';

export type ParticipantsListProps = {
  participants: DrawGroupParticipantDetailDto[];
};

const findParticipantByEmail = (
  participants: DrawGroupParticipantDetailDto[],
  email: string,
): DrawGroupParticipantDetailDto | undefined => {
  return participants.find((participant) => participant.email === email);
};

export const ParticipantsList: Component<ParticipantsListProps> = (props) => {
  const sortedParticipants = [...props.participants].sort((a, b) => {
    return a.fullName.localeCompare(b.fullName);
  });

  return (
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-bold text-pallete-6 mb-4">
        <FormattedMessage message={messages.participants} />
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
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                <FormattedMessage message={messages.status} />
              </th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                <FormattedMessage message={messages.drawnParticipant} />
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={sortedParticipants}>
              {(participant) => (
                <tr class="border-b border-gray-100 hover:bg-gray-50">
                  <td class="py-3 px-4 text-pallete-6">{participant.fullName}</td>
                  <td class="py-3 px-4 text-gray-600">{participant.email}</td>
                  <td class="py-3 px-4">
                    {participant.hasDrawn ? (
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FormattedMessage message={messages.hasDrawn} />
                      </span>
                    ) : (
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <FormattedMessage message={messages.notDrawnYet} />
                      </span>
                    )}
                  </td>
                  <td class="py-3 px-4">
                    {participant.drawnParticipant && (
                      <div class="flex flex-col gap-0.5">
                        <span class="text-pallete-6">
                          {
                            findParticipantByEmail(
                              sortedParticipants,
                              participant.drawnParticipant.email,
                            )!.fullName
                          }
                        </span>
                        <span class="text-sm text-gray-500">
                          {participant.drawnParticipant.email}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};
