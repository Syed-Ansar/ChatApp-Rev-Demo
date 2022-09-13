/* eslint-disable react-native/no-inline-styles */
import {useEffect, useState} from 'react';
import React from 'react';
import {KeyboardAvoidingView, StatusBar, Text, View} from 'react-native';

import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  Thread,
} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';

const App = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [ready, setReady] = useState(null);
  const [thread, setThread] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Test = {
    id: 'Syed',
    name: 'Syed',
    image: 'https://unsplash.com/photos/H5PnIYI_1I0',
  };

  const filters = {type: 'messaging', members: {$in: [Test.id]}};

  const API_KEY = '7jq6u97pv9gf';
  const client = StreamChat.getInstance(API_KEY);

  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          ...Test,
        },
        client.devToken(Test.id),
      );
      console.warn('Conected');
      setReady(true);
    };
    connectUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // return () => {
    //   if (!client) {
    //     client.disconnectUser();
    //   }
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return null;
  } else {
    return (
      <OverlayProvider>
        <StatusBar />
        <View>
          {selectedChannel && (
            <Text
              style={{
                marginTop: 50,
                marginLeft: 20,
                marginBottom: 40,
                fontWeight: 'bold',
              }}
              onPress={() => {
                thread && setThread(null);
                thread === null && setSelectedChannel(null);
              }}
            >
              Go back
            </Text>
          )}
        </View>
        {!selectedChannel && (
          <Text
            style={{
              marginTop: 50,
              marginBottom: 30,
              paddingHorizontal: 20,
              fontWeight: 'bold',
            }}
          >
            Messenger
          </Text>
        )}
        <View style={{flex: 1}}>
          <Chat client={client}>
            {selectedChannel ? (
              <Channel
                channel={selectedChannel}
                keyboardVerticalOffset={0}
                thread={thread}
                threadList={!!thread}
              >
                {thread ? (
                  <Thread />
                ) : (
                  <>
                    <MessageList onThreadSelect={setThread} />
                    <KeyboardAvoidingView
                      keyboardVerticalOffset={0}
                      behavior={'padding'}
                      style={{marginBottom: 20}}
                    >
                      <MessageInput />
                    </KeyboardAvoidingView>
                  </>
                )}
              </Channel>
            ) : (
              <>
                <ChannelList onSelect={setSelectedChannel} filters={filters} />
              </>
            )}
          </Chat>
        </View>
      </OverlayProvider>
    );
  }
};

export default App;
