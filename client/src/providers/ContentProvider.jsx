import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ContentContext = React.createContext(null);

export function useContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error('useContent must be used within a ContentContextProvider');
  }

  return context;
}

export const ContentProvider = ({ children }) => {
  const [address, updateAddress] = useState('');
  const [content, updateContent] = useState({});

  const value = useMemo(() => ({
    address,
    updateAddress,
    content,
    updateContent
  }), [
    address,
    content
  ]);

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
