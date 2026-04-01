'use client';

export function Pagination() {
  return (
    <div className="py-8 px-4">
      <div className="flex items-center justify-center gap-2">
        <button className="w-3 h-3 rounded-none bg-muted-foreground hover:bg-primary transition-colors" />
        <button className="w-3 h-3 rounded-none bg-primary" />
        <button className="w-3 h-3 rounded-none bg-muted-foreground hover:bg-primary transition-colors" />
        <button className="w-3 h-3 rounded-none bg-muted-foreground hover:bg-primary transition-colors" />
      </div>
    </div>
  );
}