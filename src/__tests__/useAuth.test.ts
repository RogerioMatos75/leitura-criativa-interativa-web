import { renderHook } from '@testing-library/react-hooks';
import useAuth from '../hooks/useAuth';

describe('useAuth', () => {
    it('should return user data', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useAuth());

        await waitForNextUpdate();

        expect(result.current.user).toBeDefined();
    });
});
