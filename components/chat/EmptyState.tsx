export function EmptyState() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">No conversation selected</h3>
                <p className="mt-1 text-gray-500">Choose a conversation from the sidebar or start a new one</p>
            </div>
        </div>
    );
} 